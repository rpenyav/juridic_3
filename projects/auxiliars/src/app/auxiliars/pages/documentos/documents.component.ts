import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { I18nService } from 'shared-lib';
import { showCustomAlert } from 'projects/auxiliars/src/utils/showCustomAlert';
import { getApiEndpoints } from '../../../constants/api-endpoints.constants';
import { Bank, PaginatedResponse } from '../../interfaces/banks';
import { GeneralService } from '../../services/general.service';
import { MENU_ITEMS } from '../../../constants/menu.constants';

import {
  DOCUMENTOS_COLUMNS_CONFIG,
  DOCUMENTOS_SEARCH_CRITERIA,
  DOCUMENTOS_FORM_CONFIG,
} from './documents.config';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  endpoints = getApiEndpoints();
  titol: string = '';
  currentSearchBody!: any[];
  pageNumber: number = 0;
  pageSize: number = 10;
  sortType: string = 'ASC'; // Sentido por defecto
  totalPages: number = 0;
  totalElements: number = 0;
  loading: boolean = true;
  currentAction!: string;
  selectedRegister: any;
  formForm!: FormGroup;

  @ViewChild('uploadModal') defaultLanguage: string = 'ca';

  detailUrl: string = 'banks';
  sortField: string = 'id';
  icono: string = 'documentsType';
  ENDPOINT = `${this.endpoints.BANKS_ENDPOINT}`;
  addressTypesData: Bank[] = [];
  filteredRegistersData: Bank[] = [];

  columnsConfig = DOCUMENTOS_COLUMNS_CONFIG(this);
  searchCriteria = DOCUMENTOS_SEARCH_CRITERIA;
  formConfig = DOCUMENTOS_FORM_CONFIG;

  translations: Record<string, any> = {};
  private translationsSubscription: Subscription;

  constructor(
    public generalService: GeneralService,
    private modalService: NgbModal,
    private i18nService: I18nService,
    public router: Router
  ) {}

  /**
   * @inheritdoc
   */
  ngOnInit(): void {
    this.icono = MENU_ITEMS[this.icono].icon;
    const savedPageNumber = sessionStorage.getItem(
      this.detailUrl + '.pageNumber'
    );
    if (savedPageNumber !== null) {
      this.pageNumber = +savedPageNumber;
    }

    this.translationsSubscription = this.i18nService.translations$.subscribe(
      (translations: Record<string, any>) => {
        this.translations = translations;
      },
      (error) => console.error('Error loading translations', error)
    );

    this.getRegisters();
  }

  /**
   * Obtiene el idioma desde el almacenamiento local.
   * @returns El idioma almacenado o el idioma por defecto.
   */
  getLangFromStorage(): string {
    return localStorage.getItem('appLocale') ?? this.defaultLanguage;
  }

  /**
   * Traduce una clave de traducción.
   * @param key La clave de traducción.
   * @returns La traducción correspondiente o la clave original si no se encuentra.
   */
  translate(key: string): string {
    let parts = key.split('.');
    let result = this.translations;
    for (let part of parts) {
      if (result[part]) {
        result = result[part];
      } else {
        return key; // Devuelve la clave original si cualquier parte no existe
      }
    }
    return typeof result === 'string' ? result : key;
  }

  /**
   * Procesa los resultados de la búsqueda.
   * @param resultados Los resultados de la búsqueda.
   */
  searchResults(resultados: any[]): void {
    this.currentSearchBody = resultados;
    this.generalService
      .searchWithPost<PaginatedResponse>(
        this.ENDPOINT,
        resultados,
        this.pageNumber,
        this.pageSize,
        this.sortField,
        this.sortType
      )
      .subscribe({
        next: (data: PaginatedResponse) => {
          this.addressTypesData = data.list;
          this.filteredRegistersData = [...this.addressTypesData];
          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error durante la búsqueda:', error);
          this.loading = false;
        },
      });
  }

  /**
   * Ordena los datos de la tabla.
   * @param sortData Los datos de ordenación.
   */
  onSorted(sortData: { key: string; direction: 'ASC' | 'DESC' }): void {
    this.sortField = sortData.key;
    this.sortType = sortData.direction;
    this.generalService
      .searchWithPost<PaginatedResponse>(
        this.ENDPOINT,
        this.currentSearchBody,
        this.pageNumber,
        this.pageSize,
        sortData.key,
        sortData.direction
      )
      .subscribe((response) => {
        this.updateTableData(response.list);
      });
  }

  /**
   * Actualiza los datos de la tabla.
   * @param data Los datos a actualizar.
   */
  updateTableData(data: Bank[]): void {
    this.filteredRegistersData = data;
  }

  /**
   * Carga los registros.
   */
  getRegisters(): void {
    this.loading = true;
    this.currentSearchBody = [];
    this.generalService
      .getRegisterTypes<PaginatedResponse>(
        this.ENDPOINT,
        this.pageNumber,
        this.pageSize,
        this.sortField,
        this.sortType
      )
      .subscribe({
        next: (data: PaginatedResponse) => {
          console.log('Datos recibidos:', data);
          this.addressTypesData = data.list;
          this.filteredRegistersData = [...this.addressTypesData];
          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al obtener los registros:', error);
          this.loading = false;
        },
      });
  }

  /**
   * Cambia la página actual.
   * @param pageNumber El número de la página a cambiar.
   */
  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    sessionStorage.setItem(
      this.detailUrl + '.pageNumber',
      pageNumber.toString()
    );
    this.getRegisters();
  }

  /**
   * Obtiene los números de página.
   * @returns Un arreglo con los números de página.
   */
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  /**
   * Crea un nuevo registro.
   * @param addressTypesData Los datos del registro a crear.
   */
  create(addressTypesData: Bank): void {
    this.generalService
      .createRegisterType<Bank>(this.ENDPOINT, addressTypesData)
      .subscribe({
        next: (response) => {
          showCustomAlert(this.i18nService, {
            titleKey: this.translate('FORM.create_success_title'),
            textKey: this.translate('FORM.create_success_message'),
            icon: 'success',
            confirmButtonTextKey: this.translate('FORM.ok'),
            cancelButtonTextKey: this.translate('FORM.cancel'),
          });
          this.modalService.dismissAll();
          this.getRegisters();
        },
        error: (error) => {
          showCustomAlert(this.i18nService, {
            titleKey: this.translate('FORM.create_error_title'),
            textKey: this.translate('FORM.create_error_message'),
            icon: 'error',
            confirmButtonTextKey: this.translate('FORM.ok'),
          });
        },
      });
  }

  /**
   * Navega a la página de detalles de un registro.
   * @param addressTypesId El ID del registro.
   */
  viewDetails(addressTypesId: string | number): void {
    this.router.navigate([`/auxiliars/_/${this.detailUrl}/${addressTypesId}`]);
  }

  /**
   * Navega a una acción específica.
   * @param action La acción a realizar.
   */
  navigateToAction(action: string): void {
    const routePath = `/auxiliars/_/${this.detailUrl}/${action}`;
    this.router.navigate([routePath]);
  }

  /**
   * Elimina un registro.
   * @param addressTypes Los datos del registro a eliminar.
   */
  delete(addressTypes: Bank): void {
    const titleWithName = `${this.translate('FORM.desea_eliminar')} "${
      addressTypes.id
    }"?`;

    showCustomAlert(this.i18nService, {
      titleKey: this.translate('FORM.title_swa'),
      textKey: this.translate('FORM.text_swa'),
      confirmButtonTextKey: this.translate('FORM.yes_delete'),
      cancelButtonTextKey: this.translate('FORM.cancel'),
      showCancelButton: true,
      customTitle: titleWithName,
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalService
          .deleteRegisterType<Bank>(this.ENDPOINT, addressTypes.id!)
          .subscribe({
            next: (response) => {
              console.log('Respuesta de la solicitud DELETE:', response);
              this.getRegisters();
            },
            error: (error) => {
              console.error('Error ocurrido en deleteRegisterType:', error);
            },
          });
      }
    });
  }
}
