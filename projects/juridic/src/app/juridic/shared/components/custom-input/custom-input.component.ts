import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() placeholder: string = '';
  @Input() label: string;
  @Input() controlId: string;
  @Input() type: string = 'text'; // Permite cambiar el tipo de input (text,email,  password, etc.)

  constructor() {}

  ngOnInit(): void {}
}
