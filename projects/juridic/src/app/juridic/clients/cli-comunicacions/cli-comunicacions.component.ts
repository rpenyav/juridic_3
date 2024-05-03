import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-comunicacions',
  templateUrl: './cli-comunicacions.component.html',
  styleUrls: ['./cli-comunicacions.component.css'],
})
export class CliComunicacionsComponent implements OnInit {
  @Input() documentNumber: string;

  constructor() {}

  ngOnInit(): void {
    console.log('documentNumber', this.documentNumber);
  }
}
