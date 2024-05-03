import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-expedients',
  templateUrl: './cli-expedients.component.html',
  styleUrls: ['./cli-expedients.component.css'],
})
export class CliExpedientsComponent implements OnInit {
  @Input() documentNumber: string;

  constructor() {}

  ngOnInit(): void {
    console.log('documentNumber', this.documentNumber);
  }
}
