import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-dades-bancaries',
  templateUrl: './cli-dades-bancaries.component.html',
  styleUrls: ['./cli-dades-bancaries.component.css'],
})
export class CliDadesBancariesComponent implements OnInit {
  @Input() documentNumber: string;

  constructor() {}

  ngOnInit(): void {
    console.log('documentNumber', this.documentNumber);
  }
}
