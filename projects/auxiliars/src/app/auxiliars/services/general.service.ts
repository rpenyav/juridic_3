/* eslint-disable nombre-de-la-regla */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { getAuthToken } from 'projects/auxiliars/src/utils/getToken';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  /**
   * Genera capçaleres per a les sol·licituds HTTP.
   * @returns HttpHeaders amb l'autorització inclosa.
   */
  private getHeaders(): HttpHeaders {
    const authToken = getAuthToken();
    return new HttpHeaders({ Authorization: `Bearer ${authToken}` });
  }

  /**
   * BUSQUEDA
   * @param endpoint
   * @param searchParams
   * @returns
   */

  searchWithPost<T>(
    endpoint: string,
    searchBody: any[],
    page: number = 0,
    pagesize: number = 5,
    sortField?: string,
    sortType: string = 'ASC' // Asume 'ASC' como valor por defecto
  ): Observable<T> {
    console.log(page);
    // Construimos el endpoint incluyendo los parámetros de paginación y ordenación
    let paginatedEndpoint = `${endpoint}/search?page=0&pagesize=${pagesize}`;
    if (sortField) {
      paginatedEndpoint += `&sortField=${sortField}&sortType=${sortType}`;
    }

    return this.http
      .post<T>(paginatedEndpoint, searchBody, { headers: this.getHeaders() })
      .pipe(
        tap((data) => console.log('Resultados de búsqueda:', data)),
        catchError((error) => {
          console.error('Error durante la búsqueda:', error);
          return throwError(
            () =>
              new Error(
                'Error durante la búsqueda. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }

  /**
   * Recupera tipos de registro paginados del servidor.
   * @param endpoint La URL del endpoint al que se hace la solicitud.
   * @param pageNumber El número de la página a solicitar, ajustado a índice base 0 automáticamente.
   * @param pageSize El número de elementos por página.
   * @param sortField El campo por el cual se ordenarán los resultados.
   * @param sortType El tipo de orden (ASC o DESC).
   * @returns Observable<T> Un observable que emite los datos solicitados.
   */
  getRegisterTypes<T>(
    endpoint: string,
    pageNumber: number = 0,
    pageSize: number = 5,
    sortField?: string,
    sortType: string = 'ASC'
  ): Observable<T> {
    // Ajuste para el índice base 0 antes de realizar la solicitud.
    pageNumber = Math.max(pageNumber - 1, 0); // Asegura que el número de página no sea negativo.

    let params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('pagesize', pageSize.toString());

    if (sortField) {
      params = params.set('sortField', sortField).set('sortType', sortType);
    }

    return this.http
      .get<T>(`${endpoint}/paged`, {
        headers: this.getHeaders(),
        params: params,
      })
      .pipe(
        tap((data) => console.log('Datos recibidos del servidor:', data)),
        catchError((error) => {
          console.error('Error en la obtención de registros:', error);
          return throwError(
            () =>
              new Error(
                'Error en la obtención de registros. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }

  /**
   * Recupera un tipus de registre per la seva ID.
   * @param id La ID del tipus de registre a recuperar.
   * @returns Un Observable del tipus de registre.
   */

  getRegisterTypeById<T>(endpoint: string, id: number): Observable<T | null> {
    return this.http
      .get<T>(`${endpoint}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(() => {
          return throwError(
            () =>
              new Error(
                'Error al obtener el registro por ID. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }

  /**
   * Crea un nou tipus de registre.
   * @param registreType El tipus de registre a crear.
   * @returns Un Observable del nou tipus de registre creat.
   */
  createRegisterType<T>(endpoint: string, registreType: T): Observable<T> {
    return this.http
      .post<T>(`${endpoint}/`, registreType, { headers: this.getHeaders() })
      .pipe(
        catchError(() => {
          return throwError(
            () =>
              new Error(
                'Error al crear el registro. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }

  /**
   * Función para convertir CSV a JSON
   * @param file
   * @returns
   */

  uploadFileToServer(endpoint: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const localhost = 'http://localhost:3000/banks';
    console.log(endpoint);
    //const url = `${endpoint}/upload-massive`;
    const url = `${localhost}/upload-massive`;
    let headers = this.getHeaders();
    headers = headers.delete('Content-Type');

    return this.http
      .post(url, formData, {
        headers: headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error en uploadFileToServer', error);
          return throwError(
            () => new Error('Error en la subida del archivo CSV')
          );
        })
      );
  }

  /**
   * Actualitza un tipus de registre existent.
   * @param id La ID del tipus de registre a actualitzar.
   * @param registreType Les dades actualitzades del tipus de registre.
   * @returns Un Observable del tipus de registre actualitzat.
   */
  updateRegisterType<T>(
    endpoint: string,
    id: number,
    registerType: T
  ): Observable<T> {
    return this.http
      .put<T>(`${endpoint}/${id}`, registerType, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar el registro:', error);
          return throwError(
            () =>
              new Error(
                'Error al actualizar el registro. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }

  /**
   * Elimina un tipus de registre per la seva ID.
   * @param id La ID del tipus de registre a eliminar.
   * @returns Un Observable que indica el resultat de l'operació d'eliminació.
   */

  deleteRegisterType<R>(endpoint: string, id: number): Observable<R> {
    return this.http
      .delete<R>(`${endpoint}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(() => {
          return throwError(
            () =>
              new Error(
                'Error al eliminar el registro. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }
}
