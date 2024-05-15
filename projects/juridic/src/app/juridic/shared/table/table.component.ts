import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { setupColumns } from '../../utils/functions';
import { ExpedienteModel } from '../../interfaces/expedientes';
import { ClientModel } from '../../interfaces/clients';

type Column<T> = {
  field: keyof T;
  title: string;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T extends ExpedienteModel | ClientModel>
  implements OnInit
{
  private _data: T[] = [];
  @Output() onReferenciaClick = new EventEmitter<T>();
  @Input() type: string = '';
  openedWindows: Record<string, Window | null> = {};
  columns: Column<T>[] = [];

  @Input()
  set data(value: T[] | undefined) {
    this._data = Array.isArray(value) ? value : [];
  }

  get data(): T[] {
    return this._data;
  }

  ngOnInit(): void {
    this.columns = setupColumns<T>(this.type);
  }

  handleReferenciaClick(item: T): void {
    const tabOpenedKey = `isTabOpenedWith${
      this.type.charAt(0).toUpperCase() + this.type.slice(1)
    }`;
    let openedIds = JSON.parse(sessionStorage.getItem(tabOpenedKey) || '[]');

    if (!openedIds.includes(item.id)) {
      if (!this.openedWindows[item.id] || this.openedWindows[item.id]?.closed) {
        this.onReferenciaClick.emit(item);
        this.openedWindows[item.id] = window;
        openedIds.push(item.id);
        sessionStorage.setItem(tabOpenedKey, JSON.stringify(openedIds));
      }
    } else {
      if (this.openedWindows[item.id] && !this.openedWindows[item.id]?.closed) {
        this.openedWindows[item.id].focus();
      }
    }
  }
}
