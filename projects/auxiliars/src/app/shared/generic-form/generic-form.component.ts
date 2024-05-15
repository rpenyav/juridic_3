import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent<T> implements OnInit {
  @Input() config: any[] = []; // Define una interfaz para tu configuración si es necesario
  @Input() submitFunction!: (formValue: T) => void;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const formGroupConfig = this.config.reduce((acc, curr) => {
      acc[curr.key] = ['', curr.validators || []];
      return acc;
    }, {});

    this.form = this.fb.group(formGroupConfig);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitFunction(this.form.value);
    }
  }
}
