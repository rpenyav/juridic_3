import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent<T> {
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

  viewDetails(id: string | number | undefined): void {
    this.detailViewed.emit(id);
  }

  delete(item: T): void {
    this.itemDeleted.emit(item);
  }

  getPropertyValue(row: T, key: keyof T | string): any {
    return (row as any)[key];
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
