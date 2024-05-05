import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.css'],
})
export class CustomCheckboxComponent implements OnInit {
  @Input() control: FormControl; // La instancia de FormControl para vincular el checkbox
  @Input() label: string; // Etiqueta visual para el checkbox
  @Input() controlId: string; // ID para el input, útil para la accesibilidad

  constructor() {}

  ngOnInit(): void {}
}
