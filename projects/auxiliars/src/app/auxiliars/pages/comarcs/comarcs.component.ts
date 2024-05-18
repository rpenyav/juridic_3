import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { I18nService } from 'shared-lib';
import { Router } from '@angular/router';

import { showCustomAlert } from 'projects/auxiliars/src/utils/showCustomAlert';
import { getApiEndpoints } from '../../../constants/api-endpoints.constants';
import { MENU_ITEMS } from '../../../constants/menu.constants';
import { Comarcs, PaginatedResponse } from '../../interfaces/comarcs';
import { GeneralService } from '../../services/general.service';
import { environment } from 'projects/auxiliars/src/environments/environment';

@Component({
  selector: 'app-comarcs',
  templateUrl: './comarcs.component.html',
  styleUrls: ['./comarcs.component.scss'],
})
export class ComarcsComponent implements OnInit {
  assetsBaseUrl = '/assets/';
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.COMARCS_ENDPOINT}`;
  registerTypesData: Comarcs[] = [];
  filteredRegistersData: Comarcs[] = [];
  currentSearchBody!: any[];
  pageNumber: number = 0;
  pageSize: number = 10;
  sortField: string = 'name'; // Camp per defecte per la ordenacio
  sortType: string = 'ASC'; //sentit per defecte
  totalPages: number = 0;
  totalElements: number = 0;
  loading: boolean = true;
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  currentAction!: string;
  selectedRegister: any;
  modalTitle!: string;
  formForm!: FormGroup;
  iconoS: string = 'localitTypes';
  icono: string = 'comarca';
  @ViewChild('uploadModal')
  uploadModal!: TemplateRef<any>;
  defaultLanguage: string = 'ca';
  detailUrl: string = 'regions';

  constructor(
    public generalService: GeneralService,
    private modalService: NgbModal,
    private i18nService: I18nService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const localitTypes = MENU_ITEMS[this.iconoS]?.children;
    localitTypes?.find((child) => child.key === this.icono);

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

  // ---------------------------------------------------------------------------
  // métodos de la modal
  // ---------------------------------------------------------------------------

  openModal(action: 'add', register: any = null) {
    this.currentAction = action;
    this.selectedRegister = register;
    if (action === 'add') {
      this.modalService.open(this.modalContent, {
        backdrop: 'static',
        keyboard: false,
        centered: true,
      });
    }
  }

  // ---------------------------------------------------------------------------
  // SEARCH
  // ---------------------------------------------------------------------------

  //IMPORTANT: colocar el primer element [0] sempre amb el camps default tipus name o similar
  searchCriteria = [
    {
      field: 'name',
      operator: 'contains',
      value: '',
      label: 'Nom',
      minLength: 1,
      type: 'string' as 'string',
    },
  ];

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
          this.registerTypesData = data.list;
          this.filteredRegistersData = [...this.registerTypesData];
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

  updateTableData(data: Comarcs[]): void {
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
          this.registerTypesData = data.list;
          this.filteredRegistersData = [...this.registerTypesData];
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
  // FORMULARIO
  // estos son los campos del formulario
  // ---------------------------------------------------------------------------

  /**
   * Inicialitza els camps del formulari amb els seus respectius validators.
   * Defineix la estructura del formulari, incloent els camps `id`, `name`, `code`, `swift`, i un grup anidat per a `country`.
   */

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
      key: 'name',
      label: 'Nom',
      sortable: true,
      direction: 'ASC',
      width: '80%',
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

  formConfig = [{ key: 'name', label: 'Nom', validators: [] }];

  // ---------------------------------------------------------------------------
  // métodos de CRUD
  // ---------------------------------------------------------------------------

  create(registerTypesData: Comarcs) {
    console.log('Enviando datos al servidor:', registerTypesData);
    this.generalService
      .createRegisterType<Comarcs>(this.ENDPOINT, registerTypesData)
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
   * @param registerTypesId
   */
  viewDetails(registerTypesId: string | number) {
    const currentLang = this.getLangFromStorage();
    this.router.navigate([
      '/' + currentLang + `/_/${this.detailUrl}`,
      registerTypesId,
    ]);
  }

  /**
   * esborra el registre
   * @param registerTypes
   */
  delete(nametype: Comarcs) {
    const titleWithName = `${this.i18nService.getTranslation(
      'FORM.desea_eliminar'
    )} "${nametype.name}"?`;

    showCustomAlert(this.i18nService, {
      titleKey: 'FORM.title_swa',
      textKey: 'FORM.text_swa',
      confirmButtonTextKey: 'FORM.yes_delete',
      showCancelButton: true,
      customTitle: titleWithName,
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalService
          .deleteRegisterType<Comarcs>(this.ENDPOINT, nametype.id!)
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
