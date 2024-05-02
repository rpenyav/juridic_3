import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { Observable } from 'rxjs';
import { ClientModel } from '../../interfaces/clients';
import { selectClientByDocumentNumber } from '../../state/selectors/clients.selectors';
import { getClientByDocumentNumber } from '../../state/actions/client.actions';

@Component({
  selector: 'app-cli-dades-generals',
  templateUrl: './cli-dades-generals.component.html',
  styleUrls: ['./cli-dades-generals.component.css'],
})
export class CliDadesGeneralsComponent implements OnInit {
  @Input() documentNumber: string;
  client$: Observable<ClientModel | undefined>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.client$ = this.store.pipe(
      select(selectClientByDocumentNumber, {
        documentNumber: this.documentNumber,
      })
    );
    this.store.dispatch(
      getClientByDocumentNumber({ documentNumber: this.documentNumber })
    );

    this.client$.subscribe((client) => {
      console.log('Cliente cargado:', client);
    });
  }
}
