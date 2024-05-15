import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaginatedResponse } from 'src/app/interfaces/paginated';
import { GeneralService } from 'src/app/services/general.service';

export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

class SearchOperators {
  static stringOperators = [
    { value: 'contains', label: 'conté', icon: 'find_in_page' },
    { value: 'equals', label: 'Igual a', icon: 'drag_handle' },
    { value: 'begins', label: 'Comienza', icon: 'vertical_align_top' },
  ];
  static numberOperators = [
    { value: 'equals', label: 'Igual a', icon: 'drag_handle' },
    { value: 'greater', label: 'Mayor que', icon: 'keyboard_arrow_up' },
    { value: 'lower', label: 'Menor que', icon: 'keyboard_arrow_down' },
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

  constructor(private generalService: GeneralService, private translateService:TranslateService) {}

  ngOnInit(): void {
    this.searchInputs = this.searchCriteria.map((crit) => ({
      ...crit,
      value: '',
      operator: '',
    }));
  }

  getLiteral(l:string):string{
    return this.translateService.instant(l);
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
    operators.forEach((o)=>{
      switch(o.value){
        case "contains":
          o.label = this.translateService.instant("TXT.contains");
          break;
        case "greater":
        case "equals":
          o.label = this.translateService.instant("TXT.greaterEquals");
          break;
        case "begins":
          o.label = this.translateService.instant("TXT.begins");
          break;
        case "greater":
          o.label = this.translateService.instant("TXT.greater");
          break; 
        case "lower":
          o.label = this.translateService.instant("TXT.lowerEquals");
          break;

      }
    })
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
