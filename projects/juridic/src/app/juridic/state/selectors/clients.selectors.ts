// clients.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers/index'; // Asegúrate de que el import de AppState es correcto
import { ClientState } from '../reducers/client.reducer';

// Selector base para el slice del estado de clients
export const selectClients = (state: AppState) => state.clients;

// Selector para obtener un cliente específico por documentNumber
export const selectClientByDocumentNumber = createSelector(
  selectClients,
  (state: ClientState, props: { documentNumber: string }) =>
    state.data.find((client) => client.documentNumber === props.documentNumber)
);
