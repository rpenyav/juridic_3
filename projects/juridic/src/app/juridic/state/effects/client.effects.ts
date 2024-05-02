import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ClientsService } from '../../services/clients.service';
import {
  loadClients,
  loadClientsSuccess,
  loadClientsFailure,
  getClientByDocumentNumber,
  getClientByDocumentNumberSuccess,
  getClientByDocumentNumberFailure,
} from '../actions/client.actions';

@Injectable()
export class ClientEffects {
  loadClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadClients),
      mergeMap(
        (
          { page, limit } // Destructuramos page y limit desde la acción
        ) =>
          this.clientsService.getAllClients(page, limit).pipe(
            map((clients) => loadClientsSuccess({ clients })),
            catchError((error) => of(loadClientsFailure({ error })))
          )
      )
    )
  );

  getClientByDocumentNumber$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getClientByDocumentNumber),
      mergeMap(({ documentNumber }) =>
        this.clientsService.getClientByDocumentNumber(documentNumber).pipe(
          map((client) => getClientByDocumentNumberSuccess({ client })),
          catchError((error) => of(getClientByDocumentNumberFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private clientsService: ClientsService
  ) {}
}
