// client.reducer.ts

import { createReducer, on, Action } from '@ngrx/store';
import {
  loadClientsFailure,
  loadClientsSuccess,
} from '../actions/client.actions';

// Definir y exportar la interfaz para el estado del cliente
export interface ClientState {
  data: any[];
  error: string | null;
  loaded: boolean;
}

// Estado inicial
export const initialState: ClientState = {
  data: [],
  error: null,
  loaded: false,
};

const _clientReducer = createReducer(
  initialState,
  on(loadClientsSuccess, (state, { clients }) => ({
    ...state,
    data: [clients],
    loaded: true,
    error: null,
  })),
  on(loadClientsFailure, (state, { error }) => ({
    ...state,
    error: error,
    loaded: true,
  }))
);

// Función reducer que será exportada y utilizada en el combinador de reducers
export function clientReducer(state: ClientState | undefined, action: Action) {
  return _clientReducer(state, action);
}
