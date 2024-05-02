import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-facturacio',
  templateUrl: './cli-facturacio.component.html',
  styleUrls: ['./cli-facturacio.component.css'],
})
export class CliFacturacioComponent implements OnInit {
  @Input() documentNumber: string;

  constructor() {}

  ngOnInit(): void {
    console.log('documentNumber', this.documentNumber);
  }
}
