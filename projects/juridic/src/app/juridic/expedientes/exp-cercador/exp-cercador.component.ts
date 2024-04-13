import {
  Component,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { mockData } from '../../mock/mockdata';

@Component({
  selector: 'app-exp-cercador',
  templateUrl: './exp-cercador.component.html',
  styleUrls: ['./exp-cercador.component.css'],
})
export class ExpCercadorComponent implements OnInit {
  searchForm: FormGroup;
  results: any[] = [];
  @Output() referenciaSelected = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initForm();
    this.restoreSearchState();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      referencia: [''],
      numExpedient: [''],
      client: [''],
      contrato: [''],
      tutor: [''],
      estat: [''],
      numAutos: [''],
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.results = this.search(mockData, this.searchForm.value);
      this.saveSearchState(); // Guardar estado después de la búsqueda
    }
  }

  saveSearchState(): void {
    sessionStorage.setItem('searchResults', JSON.stringify(this.results));
    sessionStorage.setItem(
      'searchCriteria',
      JSON.stringify(this.searchForm.value)
    );
  }

  restoreSearchState(): void {
    const results = sessionStorage.getItem('searchResults');
    const criteria = sessionStorage.getItem('searchCriteria');

    if (results) {
      this.results = JSON.parse(results);
    }
    if (criteria) {
      const criteriaObj = JSON.parse(criteria);
      this.searchForm.setValue(criteriaObj);
      this.onSubmit(); // Realizar búsqueda basada en los criterios restaurados
    }
  }

  search(data: any[], criteria: any): any[] {
    return data.filter((item) => {
      return (
        (!criteria.referencia ||
          item.Referència.toLowerCase().includes(
            criteria.referencia.toLowerCase()
          )) &&
        (!criteria.numExpedient ||
          item['Num. Expedient']
            .toLowerCase()
            .includes(criteria.numExpedient.toLowerCase())) &&
        (!criteria.client ||
          item.Client.toLowerCase().includes(criteria.client.toLowerCase())) &&
        (!criteria.contrato ||
          item.Contrato.toLowerCase().includes(
            criteria.contrato.toLowerCase()
          )) &&
        (!criteria.tutor ||
          item.Tutor.toLowerCase().includes(criteria.tutor.toLowerCase())) &&
        (!criteria.estat ||
          item.Estat.toLowerCase().includes(criteria.estat.toLowerCase())) &&
        (!criteria.numAutos ||
          item['Num. Autos']
            .toLowerCase()
            .includes(criteria.numAutos.toLowerCase()))
      );
    });
  }

  handleReferenciaSelected(item: any) {
    this.referenciaSelected.emit(item);
  }
}
