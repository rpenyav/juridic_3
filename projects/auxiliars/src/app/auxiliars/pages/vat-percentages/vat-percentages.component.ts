import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { I18nService } from 'shared-lib';
import { Router } from '@angular/router';
import { showCustomAlert } from 'projects/auxiliars/src/utils/showCustomAlert';
import { getApiEndpoints } from '../../../constants/api-endpoints.constants';
import { MENU_ITEMS } from '../../../constants/menu.constants';
import {
  VatPercentages,
  PaginatedResponse,
} from '../../interfaces/vat-percentages';
import { GeneralService } from '../../services/general.service';
import { environment } from 'projects/auxiliars/src/environments/environment';

@Component({
  selector: 'app-vat-percentages',
  templateUrl: './vat-percentages.component.html',
  styleUrls: ['./vat-percentages.component.scss'],
})
export class VatPercentagesComponent implements OnInit {
  assetsBaseUrl = '/assets/';
  endpoints = getApiEndpoints();
  titol: string = '';

  currentSearchBody!: any[];
  pageNumber: number = 0;
  pageSize: number = 10;

  sortType: string = 'ASC'; //sentit per defecte
  totalPages: number = 0;
  totalElements: number = 0;
  loading: boolean = true;
  currentAction!: string;
  selectedRegister: any;
  formForm!: FormGroup;

  @ViewChild('uploadModal')
  defaultLanguage: string = 'ca';

  detailUrl: string = 'vat-percentages';
  sortField: string = 'id'; // Camp per defecte per la ordenacio
  icono: string = 'vatPercentagesTypes';
  ENDPOINT = `${this.endpoints.VAT_PERCENTAGES}`;
  addressTypesData: VatPercentages[] = [];
  filteredRegistersData: VatPercentages[] = [];

  // ---------------------------------------------------------------------------
  // TAULA
  // columnes de la taula
  // ---------------------------------------------------------------------------

  columnsConfig: {
    key: string;
    label: string;
    sortable?: boolean;
    type?: string;
    width?: string;
    direction: 'ASC' | 'DESC' | undefined;
    action?: (item: any) => void;
  }[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      direction: 'ASC',
      width: '10%',
    },
    {
      key: 'literalDescriptionText',
      label: 'Name',
      sortable: true,
      direction: 'ASC',
      width: '30%',
    },
    {
      key: 'percentage',
      label: 'percentage',
      sortable: true,
      direction: 'ASC',
      width: '15%',
    },

    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      type: 'actions',
      direction: 'ASC',
      width: '10%',
      action: (row: any) => this.viewDetails(row.id),
    },
  ];

  // ---------------------------------------------------------------------------
  // SEARCH
  // ---------------------------------------------------------------------------

  //IMPORTANT: colocar el primer element [0] sempre amb el camps default tipus name o similar
  searchCriteria = [
    {
      field: 'literalDescriptionText',
      operator: 'contains',
      value: '',
      label: 'Texto Literal',
      minLength: 1,
      type: 'string' as 'string',
    },
    {
      field: 'percentage',
      operator: 'contains',
      value: '',
      label: 'percentage',
      minLength: 1,
      type: 'number' as 'number',
    },
  ];

  constructor(
    public generalService: GeneralService,
    private modalService: NgbModal,
    private i18nService: I18nService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.icono = MENU_ITEMS[this.icono].icon;
    setTimeout(() => {
      this.titol = this.i18nService.getTranslation('VAT_PERCENTAGES.TITLE');
    });
    const savedPageNumber = sessionStorage.getItem(
      this.detailUrl + '.pageNumber'
    );
    if (savedPageNumber !== null) {
      this.pageNumber = +savedPageNumber;
    }
    this.getRegisters();
  }

  /**
   * get language
   * @returns agafe el idioma de local storage
   */
  getLangFromStorage(): string {
    return localStorage.getItem('userLang') ?? this.defaultLanguage;
  }

  /**
   * RESULTATS DE LA CERCA
   * @param resultados
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

  // ---------------------------------------------------------------------------
  // ordenacio
  // ---------------------------------------------------------------------------

  onSorted(sortData: { key: string; direction: 'ASC' | 'DESC' }) {
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

  updateTableData(data: VatPercentages[]): void {
    this.filteredRegistersData = data;
  }

  // ---------------------------------------------------------------------------
  // carrega de dades
  // ---------------------------------------------------------------------------

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

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    sessionStorage.setItem(
      this.detailUrl + '.pageNumber',
      pageNumber.toString()
    );
    this.getRegisters();
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // ---------------------------------------------------------------------------
  // métodos de CRUD
  // ---------------------------------------------------------------------------

  create(addressTypesData: VatPercentages) {
    console.log('Enviando datos al servidor:', addressTypesData);
    this.generalService
      .createRegisterType<VatPercentages>(this.ENDPOINT, addressTypesData)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          showCustomAlert(this.i18nService, {
            titleKey: 'FORM.create_success_title',
            textKey: 'FORM.create_success_message',
            icon: 'success',
            confirmButtonTextKey: 'FORM.ok',
          });
          this.modalService.dismissAll();
          this.getRegisters();
        },
        error: (error) => {
          console.error('Error al crear el registro:', error);
          showCustomAlert(this.i18nService, {
            titleKey: 'FORM.create_error_title',
            textKey: 'FORM.create_error_message',
            icon: 'error',
            confirmButtonTextKey: 'FORM.ok',
          });
        },
      });
  }

  /**
   * aquí definim la ruta de la pàgina de detall
   * per això definirem aquí la ruta i afegirem al component compartit dynamic-detail
   * no és necessari afegir-la al routing component
   * @param addressTypesId
   */
  viewDetails(addressTypesId: string | number): void {
    this.router.navigate([`/auxiliars/_/${this.detailUrl}/${addressTypesId}`]);
  }

  navigateToAction(action: string) {
    const routePath = `/auxiliars/_/${this.detailUrl}/${action}`;
    this.router.navigate([routePath]);
  }

  /**
   * esborra el registre
   * @param addressTypes
   */
  delete(addressTypes: VatPercentages) {
    const titleWithName = `${this.i18nService.getTranslation(
      'FORM.desea_eliminar'
    )} "${addressTypes.literalDescriptionText}"?`;

    showCustomAlert(this.i18nService, {
      titleKey: 'FORM.title_swa',
      textKey: 'FORM.text_swa',
      confirmButtonTextKey: 'FORM.yes_delete',
      showCancelButton: true,
      customTitle: titleWithName,
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalService
          .deleteRegisterType<VatPercentages>(this.ENDPOINT, addressTypes.id!)
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
