import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatedResponse } from '../../../auxiliars/interfaces/paginated';
import { GeneralService } from '../../../auxiliars/services/general.service';
import { I18nService } from 'shared-lib';
import { Subscription } from 'rxjs';

class SearchOperators {
  static stringOperators = [
    { value: 'contains', label: 'contains', icon: 'fa fa-search' }, // FontAwesome icon
    { value: 'equals', label: 'equals', icon: 'fa fa-equals' }, // FontAwesome icon
    { value: 'begins', label: 'begins', icon: 'fa fa-arrow-right' }, // FontAwesome icon
  ];
  static numberOperators = [
    { value: 'equals', label: 'equals', icon: 'fa fa-equals' }, // FontAwesome icon
    { value: 'greater', label: 'greater', icon: 'fa fa-greater-than' }, // FontAwesome icon
    { value: 'lower', label: 'lower', icon: 'fa fa-less-than' }, // FontAwesome icon
  ];

  operators = [
    { value: 'drag_handle', label: 'drag_handle', icon: 'fa fa-bars' }, // FontAwesome icon
    { value: 'zoom_in', label: 'zoom_in', icon: 'fa fa-search-plus' }, // FontAwesome icon
    { value: 'zoom_out', label: 'zoom_out', icon: 'fa fa-search-minus' }, // FontAwesome icon
  ];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() endpoint: string = '';
  @Input() searchCriteria: {
    field: string;
    operator: string;
    value: string;
    label?: string;
    minLength?: number;
    type: 'string' | 'number';
  }[] = [];
  @Output() results = new EventEmitter<any[]>();
  @Output() resetSearchClicked = new EventEmitter<void>();

  searchInputs: {
    field: string;
    operator: string;
    value: string;
    minLength?: number;
    type: 'string' | 'number';
  }[] = [];
  searchResults: any[] = [];
  showError: boolean = false;
  translations: Record<string, any> = {};
  private translationsSubscription: Subscription;
  constructor(
    private generalService: GeneralService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.translationsSubscription = this.i18nService.translations$.subscribe(
      (translations) => {
        this.translations = translations;
      }
    );
    this.searchInputs = this.searchCriteria.map((crit) => ({
      ...crit,
      value: '',
      operator: '',
    }));
  }

  getOperatorOptions(
    type: 'string' | 'number'
  ): { value: string; label: string; icon?: string }[] {
    let operators;
    if (type === 'string') {
      operators = SearchOperators.stringOperators;
    } else {
      operators = SearchOperators.numberOperators;
    }
    operators.forEach((o) => {
      switch (o.value) {
        case 'contains':
          o.label = this.i18nService.getTranslation('contains');
          break;
        case 'greater':
          o.label = this.i18nService.getTranslation('greater');
          break;
        case 'equals':
          o.label = this.i18nService.getTranslation('equals');
          break;
        case 'begins':
          o.label = this.i18nService.getTranslation('begins');
          break;
        case 'lower':
          o.label = this.i18nService.getTranslation('lower');
          break;
      }
    });
    return operators.map((op) => ({
      value: op.value,
      label: op.label,
      icon: op.icon,
    }));
  }

  submitSearch(): void {
    const validSearchCriteria = this.searchInputs
      .filter((input) => input.value.length >= (input.minLength || 3))
      .map((input) => ({
        field: input.field,
        operator: input.operator,
        value: input.value,
      }));

    if (validSearchCriteria.length > 0) {
      this.generalService
        .searchWithPost<PaginatedResponse>(this.endpoint, validSearchCriteria)
        .subscribe({
          next: (data) => {
            this.searchResults = data.list;
            this.results.emit(validSearchCriteria);
          },
          error: (error) => console.error('Error durante la búsqueda:', error),
        });

      this.searchResults = [];
    } else {
      this.showError = true;
    }
  }

  onInputChange(): void {
    const allInputsEmpty = this.searchInputs.every(
      (input) => input.value === ''
    );

    if (allInputsEmpty) {
      this.resetSearch();
    } else {
      //this.submitSearch();
    }
  }

  resetSearch(): void {
    this.searchInputs.forEach((input) => (input.value = ''));
    this.searchResults = [];
    this.showError = false;
    this.resetSearchClicked.emit();
  }
}
