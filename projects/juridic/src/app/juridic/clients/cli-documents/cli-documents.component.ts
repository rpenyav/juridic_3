import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientModel } from '../../interfaces/clients';
import { ClientsService } from '../../services/clients.service';
import { FormClientService } from '../../services/form-client.service';

@Component({
  selector: 'app-cli-documents',
  templateUrl: './cli-documents.component.html',
  styleUrls: ['./cli-documents.component.css'],
})
export class CliDocumentsComponent implements OnInit {
  @Input() clientId: number;
  client$: Observable<ClientModel | null>;
  clientForm: FormGroup;

  constructor(
    private clientsService: ClientsService,
    private formService: FormClientService
  ) {}

  ngOnInit(): void {
    if (this.clientId) {
      // Fetch client data and initialize the form
      this.client$ = this.clientsService.getClientById(this.clientId).pipe(
        tap((client) => {
          this.clientForm = this.formService.initClientForm(client); // Initialize form with client data
        })
      );
    } else {
      // Initialize an empty form or with default values
      this.clientForm = this.formService.initClientForm();
    }
  }

  onSubmit() {
    console.log(this.clientForm.value);
  }
}
