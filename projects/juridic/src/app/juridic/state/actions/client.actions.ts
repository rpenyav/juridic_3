import { createAction, props } from '@ngrx/store';
import { ClientModel } from '../../interfaces/clients';

// Acciones para cargar clientes
export const loadClients = createAction(
  '[Clients Page] Load Clients',
  props<{ page: number; limit: number }>()
);

export const loadClientsSuccess = createAction(
  '[Clients API] Clients Loaded Success',
  props<{ clients: ClientModel[] }>()
);

export const loadClientsFailure = createAction(
  '[Clients API] Clients Loaded Failure',
  props<{ error: any }>()
);

export const getClientByDocumentNumber = createAction(
  '[Clients Page] Get Client By Document Number',
  props<{ documentNumber: string }>()
);

export const getClientByDocumentNumberSuccess = createAction(
  '[Clients API] Client Loaded Success',
  props<{ client: ClientModel }>()
);

export const getClientByDocumentNumberFailure = createAction(
  '[Clients API] Client Loaded Failure',
  props<{ error: any }>()
);

// Acciones para crear un nuevo cliente
export const createClient = createAction(
  '[Clients Page] Create Client',
  props<{ client: ClientModel }>()
);

export const createClientSuccess = createAction(
  '[Clients API] Client Created Success',
  props<{ client: ClientModel }>()
);

export const createClientFailure = createAction(
  '[Clients API] Client Created Failure',
  props<{ error: any }>()
);

// Acciones para actualizar un cliente existente
export const updateClient = createAction(
  '[Clients Page] Update Client',
  props<{ id: number; updates: Partial<ClientModel> }>()
);

export const updateClientSuccess = createAction(
  '[Clients API] Client Updated Success',
  props<{ client: ClientModel }>()
);

export const updateClientFailure = createAction(
  '[Clients API] Client Updated Failure',
  props<{ error: any }>()
);

// Acciones para eliminar un cliente
export const deleteClient = createAction(
  '[Clients Page] Delete Client',
  props<{ id: number }>() // Definido como number, ajusta según corresponda
);

export const deleteClientSuccess = createAction(
  '[Clients API] Client Deleted Success'
);

export const deleteClientFailure = createAction(
  '[Clients API] Client Deleted Failure',
  props<{ error: any }>()
);
