import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PaginatedResponse } from '../../interfaces/paymethods';
import { GeneralService } from '../../services/general.service';
import { EditInterface } from '../../interfaces/editInterface';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  constructor(private generalService: GeneralService) {}

  @Input() structure?: EditInterface | null = null;
  @Input() currentValue?: any;
  @Input() disabled?: boolean = true;
  @Input() readonly?: boolean = true;

  inputId: number = 1;
  filter: string = '';
  filteredEntities: Array<any> = [];
  entries: Array<any> = [];
  showResults: boolean = false;
  entryProperty: string = '';
  @Output() onEntrySelected = new EventEmitter();
  inputPlaceholder: string = '';
  kk: string = 'sad';

  ngOnInit(): void {
    if (this.currentValue) {
      this.filteredEntities.push(this.currentValue);
      this.selectEntry(this.currentValue);
    }
  }
  filterEntries(filter: string) {
    if (filter.length > 2) {
      let postFilter: Array<any> = [
        {
          field: 'name',
          operator: 'contains',
          value: filter,
        },
      ];

      let url = this.structure?.autocomplete?.url || '';

      this.generalService
        .searchWithPost<PaginatedResponse>(url, postFilter, 0, 50)
        .subscribe({
          next: (data) => {
            this.filteredEntities = data.list;
            this.showResults = true;
            //this.results.emit(validSearchCriteria);
          },
          error: (error) => console.error('Error durante la búsqueda:', error),
        });
    } else {
      this.showResults = false;
      this.filteredEntities = [];
    }
  }

  inputFieldFocused() {
    let inputId = 'inputField' + this.inputId;
    let menuId = '#menu' + this.inputId + ' ' + 'a';
    document.getElementById(inputId)?.addEventListener('keydown', function (e) {
      if (e.key == 'ArrowDown') {
        (document.querySelectorAll(menuId)[0] as any).focus();
      }
    });
  }

  getEntryTitle(entry: any) {
    let retorn = '';
    let x = 0;
    this.structure?.autocomplete?.showFields.forEach((k) => {
      if (x > 0) retorn += ' - ';
      retorn += this.getValue(entry, k.name);
      x++;
    });

    return retorn;
  }

  getValue(o: any, key: string): any {
    let tmpK = 'o';
    if (key.toString().indexOf('.') > -1) {
      key
        .toString()
        .split('.')
        .forEach((k: string) => {
          tmpK += "['" + k + "']";
        });
      return eval(tmpK);
    }
    return (o as any)[key];
  }

  selectEntry(entry: any) {
    this.filter = this.getEntryTitle(entry);
    this.showResults = false;
    if (this.structure?.autocomplete?.returnField == null) {
      this.onEntrySelected.emit(entry);
    } else {
      let r =
        typeof this.structure?.autocomplete?.returnField == 'string'
          ? this.structure?.autocomplete?.returnField
          : 'id';
      this.onEntrySelected.emit(entry[r]);
    }
  }
}
