import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  @Input() field: string = '';
  @Input() value: string | number | boolean = '';
  @Input() label: string = '';
  @Input() fieldtype: 'string' | 'number' | 'boolean' = 'string';

  originalValue: string | number | boolean = '';
  @Output() valueChange = new EventEmitter<string | number | boolean>();
  @Output() save = new EventEmitter<string | number | boolean>();
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

    this.updateLocalStorage(this.field, value);
  }

  updateLocalStorage(field: string, value: string): void {
    let currentData = JSON.parse(localStorage.getItem('editData') || '{}');
    currentData[field] = value;
    localStorage.setItem('editData', JSON.stringify(currentData));
  }

  saveEdit(): void {
    let valueToEmit: string | number | boolean = this.value;
    if (this.fieldtype === 'number') {
      valueToEmit = Number(this.value);
    } else if (this.fieldtype === 'boolean') {
      valueToEmit = this.value === 'true' || this.value === true;
    }
    this.save.emit(valueToEmit);
    this.isEditing = false;
  }

  toggleEditAll(): void {
    this.isEditing = !this.isEditing;
  }
}
