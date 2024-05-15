import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { showCustomAlert } from 'src/utils/showCustomAlert';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { getApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { SubscriptionPhase, PaginatedResponse } from 'src/app/interfaces/subscriptions/subscription-phases';

@Component({
  selector: 'app-procedure-phases',
  templateUrl: './subscription-procedure-phases.component.html',
  styleUrls: ['./subscription-procedure-phases.component.scss'],
})
export class SubscriptionPhaseComponent implements OnInit {
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
  
  detailUrl: string = 'subscription-procedure-phases';
  sortField: string = 'id'; // Camp per defecte per la ordenacio
  icono: string = 'subscription-procedure-phases';
  ENDPOINT = `${this.endpoints.SUBSCRIPTION_PHASES}`;
  addressTypesData: SubscriptionPhase[] = [];
  filteredRegistersData: SubscriptionPhase[] = [];
  titolKey = "MENU.SUBSCRIPTION_STATUS";

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
      key: 'position',
      label: 'Posicio',
      sortable: true,
      direction: 'ASC',
      width: '10%',
    },
    {
      key: 'condition',
      label: 'Condició',
      sortable: true,
      direction: 'ASC',
      width: '10%',
    },
    {
      key: 'valueYes',
      label: 'Valor Sí',
      sortable: true,
      direction: 'ASC',
      width: '10%',
    },
    {
      key: 'valueNo',
      label: 'Valor No',
      sortable: true,
      direction: 'ASC',
      width: '10%',
    },
    {
      key: 'subscriptionProcedure.literalDescriptionText',
      label: 'Tràmit',
      sortable: true,
      direction: 'ASC',
      width: '10%',
    },
    {
      key: 'subscriptionParentProcedure.literalDescriptionText',
      label: 'Tràmit pare',
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
      field: 'id',
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

  updateTableData(data: SubscriptionPhase[]): void {
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

  create(addressTypesData: SubscriptionPhase) {
    console.log('Enviando datos al servidor:', addressTypesData);
    this.generalService
      .createRegisterType<SubscriptionPhase>(this.ENDPOINT, addressTypesData)
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
  delete(addressTypes: SubscriptionPhase) {
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
          .deleteRegisterType<SubscriptionPhase>(this.ENDPOINT, addressTypes.id!)
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
