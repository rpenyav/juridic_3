import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { I18nService } from 'shared-lib';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent<T> implements OnInit {
  @Input() data: T[] = [];
  @Input() columns: {
    key: string;
    label: string;
    sortable?: boolean;
    type?: string;
    width?: string;
    direction?: 'ASC' | 'DESC';
    action?: (item: T) => void;
  }[] = [];

  @Output() detailViewed = new EventEmitter<string | number>();
  @Output() itemDeleted = new EventEmitter<any>();
  @Output() sorted = new EventEmitter<{
    key: string;
    direction: 'ASC' | 'DESC';
  }>();
  constructor(private i18nService: I18nService) {}

  ngOnInit(): void {
    console.log('data', this.data);
    console.log('columns', this.columns);
  }

  viewDetails(id: string | number | undefined): void {
    this.detailViewed.emit(id);
  }

  delete(item: T): void {
    this.itemDeleted.emit(item);
  }

  getHeader(h: string): string {
    return this.i18nService.getTranslation(h);
  }

  getPropertyValue(row: T | any, key: keyof T | string): any {
    let tmpK = 'row';
    //if(key == "solicitor") debugger;
    let retorn = '';
    if (key.toString().indexOf('.') > -1) {
      key
        .toString()
        .split('.')
        .forEach((k: string) => {
          tmpK += "['" + k + "']";
        });

      try {
        retorn = eval(tmpK);
      } catch {
        retorn = '';
      }
    } else {
      retorn = row[key.toString()];
    }
    switch (typeof retorn) {
      case 'boolean':
        retorn = retorn ? '✅' : '❌';
        break;
      case 'string':
        try {
          let tmpRetorn = retorn.replace(/-/g, '/');
          if (this.isValidDate(tmpRetorn)) {
            retorn = new Date(retorn).toLocaleDateString();
          }
        } catch {
          // uuuuups;
        }
        break;
    }
    return retorn;
  }

  isValidDate(s: any) {
    // format YY/MM/DD
    var dateFormat = /^\d{1,4}[\.|\/|-]\d{1,2}[\.|\/|-]\d{1,4}$/;

    if (dateFormat.test(s)) {
      s = s.replace(/0*(\d*)/gi, '$1');
      var dateArray = s.split(/[\.|\/|-]/);

      dateArray[1] = dateArray[1] - 1;

      if (dateArray[0].length < 4) {
        dateArray[0] =
          parseInt(dateArray[0]) < 50
            ? 2000 + parseInt(dateArray[0])
            : 1900 + parseInt(dateArray[0]);
      }
      var testDate = new Date(dateArray[0], dateArray[1], dateArray[2]);
      if (
        testDate.getDate() != dateArray[2] ||
        testDate.getMonth() != dateArray[1] ||
        testDate.getFullYear() != dateArray[0]
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  sort(column: {
    key: string;
    sortable?: boolean;
    direction?: 'ASC' | 'DESC';
  }): void {
    if (!column.sortable) return;
    const direction = column.direction === 'ASC' ? 'DESC' : 'ASC';
    column.direction = direction; // Actualiza la dirección en la columna actual
    this.sorted.emit({ key: column.key, direction });
  }
}
