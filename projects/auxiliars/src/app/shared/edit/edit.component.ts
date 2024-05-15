import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditInterface } from 'src/app/interfaces/editInterface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  @Input() field: string = '';
  @Input() value: string | number | Date | boolean = '';
  @Input() label: string = '';
  @Input() fieldtype: 'string' | 'number' | 'boolean' | 'decimal' | 'date' | string = 'string';
  @Input() maxlength: number | null = null;
  @Input() structure?: EditInterface;

  originalValue: string | number | Date | boolean = '';
  @Output() valueChange = new EventEmitter<string | number | boolean | Date>();
  @Output() save = new EventEmitter<string | number | boolean | Date>();
  @Output() cancel = new EventEmitter<void>();
  @Input() isEditing: boolean = false;

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.originalValue = this.value;
    }
  }

  onChange(value: any): void {
    console.log('Input modified value:', value);
    this.updateLocalStorage(this.field, value);
  }


  getType(value:any):string{
    return typeof(value)
  }

  updateLocalStorage(field: string, value: string): void {
    let currentData = JSON.parse(localStorage.getItem('editData') || '{}');
    currentData[field] = value;
    localStorage.setItem('editData', JSON.stringify(currentData));
  }

  saveEdit(): void {
    let valueToEmit: string | number | Date | boolean  = this.value;
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
