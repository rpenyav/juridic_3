import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GeneralService } from '../../../auxiliars/services/general.service';
import { PaginatedResponse } from '../../../auxiliars/interfaces/paginated';

class SearchOperators {
  static stringOperators = [
    { value: 'contains', label: 'Contiene', icon: 'find_in_page' },
    { value: 'greaterEquals', label: 'Igual a', icon: 'drag_handle' },
    { value: 'begins', label: 'Comienza', icon: 'vertical_align_top' },
  ];
  static numberOperators = [
    { value: 'equals', label: 'Igual a', icon: 'drag_handle' },
    { value: 'greater', label: 'Mayor que', icon: 'keyboard_arrow_up' },
    { value: 'lowerEquals', label: 'Menor que', icon: 'keyboard_arrow_down' },
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

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
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
