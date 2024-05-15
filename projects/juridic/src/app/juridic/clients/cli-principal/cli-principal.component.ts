import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../../interfaces/clients';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-cli-principal',
  templateUrl: './cli-principal.component.html',
  styleUrls: ['./cli-principal.component.css'],
})
export class CliPrincipalComponent implements OnInit {
  @Input() clientId: number;
  client$: Observable<ClientModel | null>;

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    if (this.clientId) {
      this.client$ = this.clientsService.getClientById(this.clientId);
    }
  }
}
