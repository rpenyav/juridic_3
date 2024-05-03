import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-documents',
  templateUrl: './cli-documents.component.html',
  styleUrls: ['./cli-documents.component.css'],
})
export class CliDocumentsComponent implements OnInit {
  @Input() documentNumber: string;

  constructor() {}

  ngOnInit(): void {
    console.log('documentNumber', this.documentNumber);
  }
}
