import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
})
export class CustomSelectComponent implements OnInit {
  @Input() control: FormControl;
  @Input() endpoint: string;
  @Input() placeholder: string = 'Select';
  @Input() label: string;
  @Input() controlId: string;
  @Input() valueField: string; // Campo del objeto para usar como valor de las opciones
  @Input() displayField: string; // Campo del objeto para mostrar en las opciones

  options$: Observable<any[]>;

  constructor(private generalService: GeneralService<any>) {}

  ngOnInit(): void {
    this.options$ = this.generalService.getSelectAuxiliarData(this.endpoint);
  }
}
