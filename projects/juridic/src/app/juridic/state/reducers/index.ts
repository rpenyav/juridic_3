// reducers/index.ts

import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { clientReducer, ClientState } from './client.reducer'; // Asegúrate de que la ruta sea correcta

// Define la interfaz para el estado global de la aplicación
export interface AppState {
  clients: ClientState;
}

// Combina todos los reducers de la aplicación
export const reducers: ActionReducerMap<AppState> = {
  clients: clientReducer,
};

// Opcional: Configura meta reducers si es necesario
export const metaReducers: MetaReducer<AppState>[] = [];
