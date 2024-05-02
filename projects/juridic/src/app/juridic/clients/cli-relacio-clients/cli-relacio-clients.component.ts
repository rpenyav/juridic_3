import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-relacio-clients',
  templateUrl: './cli-relacio-clients.component.html',
  styleUrls: ['./cli-relacio-clients.component.css'],
})
export class CliRelacioClientsComponent implements OnInit {
  @Input() documentNumber: string;

  constructor() {}

  ngOnInit(): void {
    console.log('documentNumber', this.documentNumber);
  }
}
