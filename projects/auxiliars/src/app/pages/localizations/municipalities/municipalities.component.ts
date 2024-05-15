import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { showCustomAlert } from 'src/utils/showCustomAlert';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { getApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { Municipalities, PaginatedResponse } from 'src/app/interfaces/localizations/municipalities';

@Component({
  selector: 'app-municipalities',
  templateUrl: './municipalities.component.html',
  styleUrls: ['./municipalities.component.scss'],
})
export class MunicipalitiesComponent implements OnInit {
  endpoints = getApiEndpoints();
  titol: string = ""

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
  
  detailUrl: string = 'municipalities';
  sortField: string = 'id'; // Camp per defecte per la ordenacio
  icono: string = 'municipalities';
  ENDPOINT = `${this.endpoints.MUNICIPALITIES}`;
  addressTypesData: Municipalities[] = [];
  filteredRegistersData: Municipalities[] = [];
  titolKey = "SUBMENU.TOWNS";

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
      key: 'name',
      label: 'name',
      sortable: true,
      direction: 'ASC',
      width: '10%',
    },
    {
      key: 'province.name',
      label: 'provincia',
      sortable: true,
      direction: 'ASC',
      width: '10%',
    },
    {
      key: 'province.autonomousRegion.name',
      label: 'autonomia',
      sortable: true,
      direction: 'ASC',
      width: '10%',
    },
    {
      key: 'province.country.code',
      label: 'pais',
      sortable: true,
      direction: 'ASC',
      width: '10%',
    },
    {
      key: 'comarca.name',
      label: 'comarca',
      sortable: true,
      direction: 'ASC',
      width: '10%',
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
      field: 'name',
      operator: 'contains',
      value: '',
      label: 'Texto Literal',
      minLength: 1,
      type: 'string' as 'string',
    }
  ];

  constructor(
    public generalService: GeneralService,
    private modalService: NgbModal,
    private txt: TranslateService,
    public router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(()=>{
      this.titol = this.txt.instant(this.titolKey)
    })
    const savedPageNumber = sessionStorage.getItem(this.detailUrl + ".pageNumber");
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

  updateTableData(data: Municipalities[]): void {
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
    sessionStorage.setItem(this.detailUrl + ".pageNumber", pageNumber.toString());
    this.getRegisters();
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

 

  // ---------------------------------------------------------------------------
  // métodos de CRUD
  // ---------------------------------------------------------------------------

  create(addressTypesData: Municipalities) {
    console.log('Enviando datos al servidor:', addressTypesData);
    this.generalService
      .createRegisterType<Municipalities>(this.ENDPOINT, addressTypesData)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          showCustomAlert(this.txt, {
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
   * @param addressTypesId
   */
  viewDetails(addressTypesId: string | number) {
    const currentLang = this.getLangFromStorage();
    this.router.navigate([
      '/' + currentLang + `/_/${this.detailUrl}`,
      addressTypesId,
    ]);
  }

  navigateToAction(action: string) {
    const currentLang = this.getLangFromStorage();
    const routePath = `/${currentLang}/_/${this.detailUrl}/${action}`;
    this.router.navigate([routePath]);
  }

  /**
   * esborra el registre
   * @param addressTypes
   */
  delete(addressTypes: Municipalities) {
    const titleWithName = `${this.txt.instant('FORM.desea_eliminar')} "${
      addressTypes.id
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
          .deleteRegisterType<Municipalities>(this.ENDPOINT, addressTypes.id!)
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
