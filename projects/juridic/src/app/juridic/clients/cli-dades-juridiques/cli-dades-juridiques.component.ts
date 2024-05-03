import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-dades-juridiques',
  templateUrl: './cli-dades-juridiques.component.html',
  styleUrls: ['./cli-dades-juridiques.component.css'],
})
export class CliDadesJuridiquesComponent implements OnInit {
  @Input() documentNumber: string;

  constructor() {}

  ngOnInit(): void {
    console.log('documentNumber', this.documentNumber);
  }
}
