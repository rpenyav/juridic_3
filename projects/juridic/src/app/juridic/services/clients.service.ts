import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ClientModel, ClientState } from '../interfaces/clients';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private baseUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient, private store: Store<ClientState>) {}

  getAllClients(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(this.baseUrl + '/get', { params }).pipe(
      map((response) => response.list),
      catchError((error) => {
        console.error('Error fetching clients:', error);
        return of([]);
      })
    );
  }

  getClientByDocumentNumber(documentNumber: string): Observable<ClientModel> {
    return this.http
      .get<ClientModel>(`${this.baseUrl}/document/${documentNumber}`)
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

  getClientById(clientId: number): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.baseUrl}/${clientId}`).pipe(
      catchError((error) => {
        console.error('Error fetching client:', error);
        return of(null);
      })
    );
  }

  // Operación para crear un nuevo cliente
  createClient(client: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>(this.baseUrl, client).pipe(
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
      .put<ClientModel>(`${this.baseUrl}/${clientId}`, updates)
      .pipe(
        catchError((error) => {
          console.error('Error updating client:', error);
          return of(null);
        })
      );
  }

  // Operación para eliminar un cliente
  deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${clientId}`).pipe(
      catchError((error) => {
        console.error('Error deleting client:', error);
        return of(null);
      })
    );
  }
}
