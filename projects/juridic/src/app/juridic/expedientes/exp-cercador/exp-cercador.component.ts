import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginatedResponse } from '../../interfaces/paginated-response';
import { ExpedienteModel } from '../../interfaces/expedientes';
import { GeneralService } from '../../services/general.service';
import { Subscription } from 'rxjs';
import { I18nService } from 'shared-lib';
import { subscribeToTranslations } from '../../utils/functions';

@Component({
  selector: 'app-exp-cercador',
  templateUrl: './exp-cercador.component.html',
})
export class ExpCercadorComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  endpoint = 'expedientes/search';
  results: ExpedienteModel[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  errorMessage: string | null = null;
  translations: Record<string, any>;
  public translationsSubscription: Subscription;

  @Output() referenciaSelected = new EventEmitter<ExpedienteModel>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dataService: GeneralService<ExpedienteModel>,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.restoreSearchState();
    this.translationsSubscription = subscribeToTranslations(
      this.i18nService,
      this.cdr,
      (translations) => (this.translations = translations)
    );
  }

  ngOnDestroy(): void {
    if (this.translationsSubscription) {
      this.translationsSubscription.unsubscribe();
    }
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      referencia: [''],
      numexpedient: [''],
      client: [''],
      contrari: [''],
      tutor: [''],
      estat: [''],
      numautos: [''],
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.dataService
        .getPaginatedData(
          this.endpoint,
          this.pageNumber,
          this.pageSize,
          this.searchForm.value
        )
        .subscribe({
          next: (response: PaginatedResponse<ExpedienteModel>) => {
            this.results = response.list;
            this.totalElements = response.totalElements;
            this.errorMessage = null; // Resetear el mensaje de error
            this.saveSearchState();
          },
          error: (error) => {
            console.error('Error fetching data: ', error);
            this.results = [];
            this.totalElements = 0;
            if (error.status === 400) {
              this.errorMessage =
                'No se encontraron resultados con los criterios proporcionados.';
            } else {
              this.errorMessage =
                'Error en la búsqueda. Por favor, intente de nuevo.';
            }
          },
        });
    }
  }

  saveSearchState(): void {
    sessionStorage.setItem('searchResults', JSON.stringify(this.results));
    sessionStorage.setItem(
      'searchCriteria',
      JSON.stringify(this.searchForm.value)
    );
  }

  restoreSearchState(): void {
    const results = sessionStorage.getItem('searchResults');
    const criteria = sessionStorage.getItem('searchCriteria');

    if (results) {
      this.results = JSON.parse(results);
    }
    if (criteria) {
      this.searchForm.setValue(JSON.parse(criteria));
      this.onSubmit();
    }
  }

  handleReferenciaSelected(item: ExpedienteModel) {
    console.log('em', item);
    this.referenciaSelected.emit(item);
  }

  closeAlert(): void {
    this.errorMessage = null;
  }

  // En exp-cercador.component.ts
  clearSearch(): void {
    // Resetear el formulario
    this.searchForm.reset();

    // Limpiar el sessionStorage
    sessionStorage.removeItem('searchResults');
    sessionStorage.removeItem('searchCriteria');

    // Limpiar los resultados actuales
    this.results = [];
    this.totalElements = 0;
  }
}
