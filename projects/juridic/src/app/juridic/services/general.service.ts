import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'projects/juridic/src/environments/environment';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { CookieService } from 'ngx-cookie-service';
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralService<T> {
  private baseUrl = `${environment.urlApi}`;
  private baseUrlAuxiliars = `${environment.urlApiAuxiliars}`;

  constructor(
    private http: HttpClient,
    private headersService: HeadersService
  ) {}

  getPaginatedData(
    endpoint: string,
    page: number = 0,
    pageSize: number,
    searchCriteria?: any
  ): Observable<PaginatedResponse<T>> {
    return this.http
      .get<PaginatedResponse<T>>(`${this.baseUrl}/${endpoint}`, {
        headers: this.headersService.getAuthHeaders(),
        params: new HttpParams()
          .set('page', page.toString())
          .set('pagesize', pageSize.toString()),
      })
      .pipe(
        map((response) => {
          if (searchCriteria) {
            response.list = response.list.filter((item) =>
              this.matchesSearchCriteria(item, searchCriteria)
            );
          }
          return response;
        }),
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          return throwError(() => new Error('Error en la solicitud HTTP'));
        })
      );
  }

  private matchesSearchCriteria(item: T, criteria: any): boolean {
    return Object.keys(criteria).every((key) => {
      if (!criteria[key]) return true; // If no filter, skip.
      const criteriaValue = criteria[key];
      const itemValue = item[key];

      if (typeof criteriaValue === 'string' && typeof itemValue === 'string') {
        // Comparación insensible a mayúsculas y minúsculas, ignorando espacios en blanco adicionales
        return (
          itemValue.trim().toLowerCase() === criteriaValue.trim().toLowerCase()
        );
      } else if (
        typeof criteriaValue === 'number' &&
        typeof itemValue === 'number'
      ) {
        // Comparación estricta para números
        return itemValue === criteriaValue;
      }

      return true; // Si necesitas otras lógicas específicas, puedes añadirlas aquí
    });
  }

  getDataById(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, {
        headers: this.headersService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          return throwError(() => new Error('Error en la solicitud HTTP'));
        })
      );
  }

  getSelectAuxiliarData(endpoint: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrlAuxiliars}/${endpoint}`, {
        headers: this.headersService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response['list'] || []),
        catchError((error) => {
          console.error('Error fetching select data:', error);
          return throwError(() => new Error('Error fetching select data'));
        })
      );
  }
}
