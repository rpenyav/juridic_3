import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-incidencies',
  templateUrl: './cli-incidencies.component.html',
  styleUrls: ['./cli-incidencies.component.css'],
})
export class CliIncidenciesComponent implements OnInit {
  @Input() documentNumber: string;

  constructor() {}

  ngOnInit(): void {
    console.log('documentNumber', this.documentNumber);
  }
}
