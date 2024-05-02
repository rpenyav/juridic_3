import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-historic-abonaments',
  templateUrl: './cli-historic-abonaments.component.html',
  styleUrls: ['./cli-historic-abonaments.component.css'],
})
export class CliHistoricAbonamentsComponent implements OnInit {
  @Input() documentNumber: string;

  constructor() {}

  ngOnInit(): void {
    console.log('documentNumber', this.documentNumber);
  }
}
