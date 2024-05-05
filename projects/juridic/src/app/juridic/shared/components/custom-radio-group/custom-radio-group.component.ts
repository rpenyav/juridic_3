import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface RadioOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-custom-radio-group',
  templateUrl: './custom-radio-group.component.html',
  styleUrls: ['./custom-radio-group.component.css'],
})
export class CustomRadioGroupComponent implements OnInit {
  @Input() control: FormControl; // Control de formulario para vincular los radios
  @Input() options: RadioOption[] = [
    // Opciones predeterminadas para los radios
    { label: 'Persona física', value: '1' },
    { label: 'Persona Jurídica', value: '2' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
