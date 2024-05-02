import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeneralService<T> {
  private baseUrl = 'http://localhost:3000'; // URL base del backend

  constructor(private http: HttpClient) {}
  getPaginatedData(
    endpoint: string,
    pageNumber: number,
    pageSize: number,
    searchCriteria?: any
  ): Observable<PaginatedResponse<T>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (searchCriteria) {
      Object.keys(searchCriteria).forEach((key) => {
        if (searchCriteria[key]) {
          params = params.append(key, searchCriteria[key]);
        }
      });
    }

    return this.http.get<PaginatedResponse<T>>(`${this.baseUrl}/${endpoint}`, {
      params,
    });
  }

  getDataById(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError(() => new Error('Error en la solicitud HTTP'));
      })
    );
  }
}
