import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ExpedienteModel } from '../../interfaces/expedientes';
import { ClienteModel } from '../../interfaces/clientes';
import { setupColumns } from '../../utils/functions';

type Column<T> = {
  field: keyof T;
  title: string;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T extends ExpedienteModel | ClienteModel> {
  @Input() data: T[] = [];
  @Output() onReferenciaClick = new EventEmitter<any>();
  @Input() type: string = '';
  openedWindows: Record<string, Window | null> = {};

  columns: Column<T>[] = [];

  ngOnInit(): void {
    this.columns = setupColumns<T>(this.type);
  }

  handleReferenciaClick(item: T, field: keyof T): void {
    if (!this.openedWindows[item.id] || this.openedWindows[item.id]?.closed) {
      this.onReferenciaClick.emit(item);
      this.openedWindows[item.id] = window;
    } else {
      this.openedWindows[item.id].focus();
    }
  }
}
