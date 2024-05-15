import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface FormField {
  key: string;
  label: string;
  type: string; // por ejemplo, 'text', 'number', 'email', etc.
  initialValue?: any;
  validators?: any[];
  maxlength?: number;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  /**
   * La instància de FormGroup per manejar el formulari dinàmic.
   */
  dynamicForm!: FormGroup;
  /**
   * Configuració per als camps del formulari, incloent tipus, validació i valors inicials.
   */
  @Input() formConfig!: FormField[];
  /**
   * Un objecte opcional per preomplir el formulari quan s'edita un registre existent.
   */
  @Input() selectedRegister: any | null = null;
  /**
   * L'acció que s'està realitzant, 'add' o 'edit', per ajustar el comportament del formulari.
   */
  @Input() action!: 'add' | 'edit';
  /**
   * Un emissor d'events per notificar els components pare de la tramesa del formulari.
   */
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Inicialitza el formulari basant-se en la configuració proporcionada.
   * Els camps es creen dinàmicament basant-se en l'array formConfig.
   */
  initializeForm(): void {
    const formGroup: any = {};

    this.formConfig.forEach((field) => {
      let initialValue = field.initialValue;

      if (
        this.selectedRegister &&
        this.selectedRegister.hasOwnProperty(field.key)
      ) {
        initialValue = this.selectedRegister[field.key];
      } else if (field.key.includes('.') && this.selectedRegister) {
        const [parentKey, childKey] = field.key.split('.');
        if (
          this.selectedRegister[parentKey] &&
          this.selectedRegister[parentKey].hasOwnProperty(childKey)
        ) {
          initialValue = this.selectedRegister[parentKey][childKey];
        }
      }

      if (field.key.includes('.')) {
        const [parentKey, childKey] = field.key.split('.');
        if (!formGroup[parentKey]) {
          formGroup[parentKey] = this.fb.group({});
        }
        formGroup[parentKey].addControl(
          childKey,
          this.fb.control(initialValue, field.validators)
        );
      } else {
        formGroup[field.key] = [initialValue, field.validators];
      }
    });

    this.dynamicForm = this.fb.group(formGroup);
  }

  /**
   * Gestiona la tramesa del formulari. Emet el valor actual del formulari si aquest és vàlid.
   */
  onSubmit(): void {
    if (this.dynamicForm.valid) {
      this.formSubmit.emit(this.dynamicForm.value);
    }
  }
}
