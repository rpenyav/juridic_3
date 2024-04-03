import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  PaginatedResponse,
  ExpFolderTypes,
} from '../../interfaces/expedients/folder-types';

import { FormGroup } from '@angular/forms';
import { I18nService } from 'shared-lib';
import { showCustomAlert } from 'projects/auxiliars/src/utils/showCustomAlert';
import { Router } from '@angular/router';
import { MENU_ITEMS } from '../../../constants/menu.constants';
import { GeneralService } from '../../services/general.service';
import { getApiEndpoints } from '../../../constants/api-endpoints.constants';

@Component({
  selector: 'app-expedient-folder-types',
  templateUrl: './expedient_folder_types.component.html',
  styleUrls: ['./expedient_folder_types.component.scss'],
})
export class ExpedientFolderTypesComponent implements OnInit {
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.EXPEDIENTS_FOLDER_TYPES_ENDPOINT}`;
  registerTypesData: ExpFolderTypes[] = [];
  filteredRegistersData: ExpFolderTypes[] = [];
  currentSearchBody!: any[];
  pageNumber: number = 0;
  pageSize: number = 10;
  sortField: string = 'literalDescriptionText'; // Camp per defecte per la ordenacio
  sortType: string = 'ASC'; //sentit per defecte
  totalPages: number = 0;
  totalElements: number = 0;
  loading: boolean = true;
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  currentAction!: string;
  selectedRegister: any;
  modalTitle!: string;
  formForm!: FormGroup;
  iconoS: string = 'expedient_folder_types';
  icono: string = 'folders-browse';
  @ViewChild('uploadModal')
  uploadModal!: TemplateRef<any>;
  defaultLanguage: string = 'ca';
  detailUrl: string = 'exp-folder-types';

  constructor(
    public generalService: GeneralService,

    private txt: I18nService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const localitTypes = MENU_ITEMS[this.iconoS]?.children;
    localitTypes?.find((child) => child.key === this.icono);

    const savedPageNumber = localStorage.getItem('pageNumber');
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
  // SEARCH
  // ---------------------------------------------------------------------------

  //IMPORTANT: colocar el primer element [0] sempre amb el camps default tipus name o similar
  searchCriteria = [
    {
      field: 'literalDescriptionText',
      operator: 'begins',
      value: '',
      label: 'Nom',
      minLength: 1,
      type: 'string' as 'string',
    },
    {
      field: 'code',
      operator: 'begins',
      value: '',
      label: 'Codi',
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

  updateTableData(data: ExpFolderTypes[]): void {
    this.filteredRegistersData = data;
  }

  // ---------------------------------------------------------------------------
  // carrega de dades
  // ---------------------------------------------------------------------------

  getRegisters(): void {
    this.loading = true;
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
    localStorage.setItem('pageNumber', pageNumber.toString());
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
      key: 'literalDescriptionText',
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

  formConfig = [
    { key: 'name', label: 'Nom', validators: [] },
    { key: 'code', label: 'Codi', validators: [] },
  ];

  // ---------------------------------------------------------------------------
  // métodos de CRUD
  // ---------------------------------------------------------------------------

  create(registerTypesData: ExpFolderTypes) {
    console.log('Enviando datos al servidor:', registerTypesData);
    this.generalService
      .createRegisterType<ExpFolderTypes>(this.ENDPOINT, registerTypesData)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          showCustomAlert(this.txt, {
            titleKey: 'FORM.create_success_title',
            textKey: 'FORM.create_success_message',
            icon: 'success',
            confirmButtonTextKey: 'FORM.ok',
          });

          this.getRegisters();
        },
        error: (error) => {
          console.error('Error al crear el registro:', error);
          showCustomAlert(this.txt, {
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
  delete(nametype: ExpFolderTypes) {
    const titleWithName = `${this.txt.getInstant('FORM.desea_eliminar')} "${
      nametype.literalDescriptionText
    }"?`;

    showCustomAlert(this.txt, {
      titleKey: 'FORM.title_swa',
      textKey: 'FORM.text_swa',
      confirmButtonTextKey: 'FORM.yes_delete',
      showCancelButton: true,
      customTitle: titleWithName,
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalService
          .deleteRegisterType<ExpFolderTypes>(this.ENDPOINT, nametype.id!)
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
