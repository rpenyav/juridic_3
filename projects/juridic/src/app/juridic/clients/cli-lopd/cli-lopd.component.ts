import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-cli-lopd',
  templateUrl: './cli-lopd.component.html',
  styleUrls: ['./cli-lopd.component.css'],
})
export class CliLopdComponent implements OnInit {
  @Input() documentNumber: string;

  constructor() {}

  ngOnInit(): void {
    console.log('documentNumber', this.documentNumber);
  }
}
