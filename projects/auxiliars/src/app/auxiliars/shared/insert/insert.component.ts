import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
})
export class InsertComponent {
  @Input() field: string = '';
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() fieldtype: 'string' | 'number' | 'boolean' = 'string';
  @Output() save = new EventEmitter<string | number | boolean>();

  originalValue: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Output() cancel = new EventEmitter<void>();
  @Input() isEditing: boolean = false;

  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.originalValue = this.value;
    }
  }

  onChange(value: string): void {
    console.log('Input modified value:', value);
    this.updateLocalStorage(this.field, value, this.fieldtype);
  }

  updateLocalStorage(
    field: string,
    value: any,
    fieldType: 'string' | 'number' | 'boolean'
  ): void {
    let currentData = JSON.parse(localStorage.getItem('insertData') ?? '{}');

    currentData[field] = { value, type: fieldType };

    localStorage.setItem('insertData', JSON.stringify(currentData));
  }

  saveEdit(): void {
    let valueToEmit: string | number | boolean = this.value;

    if (this.fieldtype === 'number') {
      valueToEmit = Number(this.value);
    } else if (this.fieldtype === 'boolean') {
      valueToEmit =
        typeof this.value === 'boolean' ? this.value : this.value === 'true';
    }

    this.save.emit(valueToEmit);
    this.isEditing = false;
  }

  toggleEditAll(): void {
    this.isEditing = !this.isEditing;
  }
}
