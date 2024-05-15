import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() placeholder: string = ''; // Placeholder para el input
  @Output() filterChange = new EventEmitter<string>(); // Evento emitido en cambios
  filterValue: string = ''; // Valor actual del filtro

  onFilterChange(): void {
    this.filterChange.emit(this.filterValue); // Emitir el valor actual del filtro
  }
}
