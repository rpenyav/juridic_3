import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { ClientModel, ClientState } from '../interfaces/clients';
import { Store } from '@ngrx/store';
import { environment } from 'projects/juridic/src/environments/environment';
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private baseUrl = `${environment.urlApi}/persons/persons`;
  private cache$: Observable<ClientModel | null>;
  constructor(
    private http: HttpClient,
    private store: Store<ClientState>,
    private headersService: HeadersService
  ) {}

  getAllClients(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http
      .get<any>(this.baseUrl + '/get', {
        params,
        headers: this.headersService.getAuthHeaders(), // Usa AuthService para obtener las cabeceras
      })
      .pipe(
        map((response) => response.list),
        catchError((error) => {
          console.error('Error fetching clients:', error);
          return of([]);
        })
      );
  }

  getClientByDocumentNumber(documentNumber: string): Observable<ClientModel> {
    return this.http
      .get<ClientModel>(`${this.baseUrl}/document/${documentNumber}`, {
        headers: this.headersService.getAuthHeaders(), // Usa AuthService para obtener las cabeceras
      })
      .pipe(
        tap((client) => {
          console.log('Received client:', client);
        }),
        catchError((error) => {
          console.error('Error fetching client by documentNumber:', error);
          return of(null);
        })
      );
  }

  getClientById(clientId: number): Observable<ClientModel | null> {
    // Solo crea un nuevo observable si cache$ no existe o si necesitas forzar la recarga
    if (!this.cache$) {
      this.cache$ = this.http
        .get<ClientModel>(`${this.baseUrl}/${clientId}`, {
          headers: this.headersService.getAuthHeaders(), // Usa AuthService para obtener las cabeceras
        })
        .pipe(
          catchError((error) => {
            console.error('Error fetching client:', error);
            return of(null);
          }),
          shareReplay(1)
        );
    }
    return this.cache$;
  }

  // Operación para crear un nuevo cliente
  createClient(client: ClientModel): Observable<ClientModel> {
    return this.http
      .post<ClientModel>(this.baseUrl, client, {
        headers: this.headersService.getAuthHeaders(), // Usa AuthService para obtener las cabeceras
      })
      .pipe(
        catchError((error) => {
          console.error('Error creating client:', error);
          return of(null);
        })
      );
  }

  // Operación para actualizar un cliente existente
  updateClient(
    clientId: number,
    updates: Partial<ClientModel>
  ): Observable<ClientModel> {
    return this.http
      .put<ClientModel>(`${this.baseUrl}/${clientId}`, updates, {
        headers: this.headersService.getAuthHeaders(), // Usa AuthService para obtener las cabeceras
      })
      .pipe(
        catchError((error) => {
          console.error('Error updating client:', error);
          return of(null);
        })
      );
  }

  // Operación para eliminar un cliente
  deleteClient(clientId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${clientId}`, {
        headers: this.headersService.getAuthHeaders(), // Usa AuthService para obtener las cabeceras
      })
      .pipe(
        catchError((error) => {
          console.error('Error deleting client:', error);
          return of(null);
        })
      );
  }
}
