import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrls: ['./custom-textarea.component.css'],
})
export class CustomTextareaComponent implements OnInit {
  @Input() control: FormControl;
  @Input() placeholder: string = '';
  @Input() label: string;
  @Input() controlId: string;
  @Input() rows: number = 3; // Default number of rows

  constructor() {}

  ngOnInit(): void {}
}
