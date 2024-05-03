import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../../interfaces/clients';
import { ClientsService } from '../../services/clients.service'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-cli-dades-generals',
  templateUrl: './cli-dades-generals.component.html',
  styleUrls: ['./cli-dades-generals.component.css'],
})
export class CliDadesGeneralsComponent implements OnInit {
  @Input() documentNumber: string;
  client$: Observable<ClientModel | null>; // Observable puede ser null si la llamada falla

  constructor(private clientsService: ClientsService) {} // Inyecta ClientsService

  ngOnInit(): void {
    if (this.documentNumber) {
      this.client$ = this.clientsService.getClientByDocumentNumber(
        this.documentNumber
      );
      // El cliente se suscribe a los datos directamente en la plantilla HTML
    }
  }
}
