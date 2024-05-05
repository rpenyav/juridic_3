import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ClientModel } from '../../interfaces/clients';
import { ClientsService } from '../../services/clients.service';
import { FormClientService } from '../../services/form-client.service';

@Component({
  selector: 'app-cli-dades-generals',
  templateUrl: './cli-dades-generals.component.html',
  styleUrls: ['./cli-dades-generals.component.css'],
})
export class CliDadesGeneralsComponent implements OnInit {
  @Input() clientId: number;
  client$: Observable<ClientModel | null>;
  clientForm: FormGroup;

  constructor(
    private clientsService: ClientsService,
    private formService: FormClientService
  ) {}

  ngOnInit(): void {
    this.clientForm = this.formService.initClientForm(); // Inicializa siempre primero.

    if (this.clientId) {
      this.client$ = this.clientsService.getClientById(this.clientId).pipe(
        tap((client) => {
          console.log('client', client.personTypeId);
          this.clientForm.patchValue(client); // Asegúrate de que el formulario está listo antes de patchear los valores.
        })
      );
    }
  }

  onSubmit() {
    console.log(this.clientForm.value);
  }
}
