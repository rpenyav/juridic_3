import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getAuthToken } from 'src/utils/getToken';
import { MOCK_PROVINCES } from 'src/app/mock/provinces-mock';
import { PaginatedResponse, Province } from 'src/app/interfaces/provinces';
import { getApiEndpoints } from 'src/app/constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class ProvincesTypeService {
  assetsBaseUrl = environment.assetsBaseUrl;
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.PROVINCIES_ENDPOINT}`;

  private testData = environment.useMockData;

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
   * Recupera tipus de províncies paginades del servidor.
   * @param pageNumber El número de pàgina a recuperar.
   * @param pageSize El nombre d'elements per pàgina.
   * @returns Un Observable de la resposta paginada.
   */
  getProvincesTypes(
    pageNumber: number = 0,
    pageSize: number = 2
  ): Observable<PaginatedResponse> {
    if (!this.testData) {
      const params = {
        page: pageNumber.toString(),
        pagesize: pageSize.toString(),
      };
      return this.http
        .get<PaginatedResponse>(this.ENDPOINT, {
          headers: this.getHeaders(),
          params,
        })
        .pipe(
          tap((response) =>
            console.log('Resposta de la sol·licitud GET:', response)
          ),
          catchError((error) => {
            console.error('Error ocorregut en getProvincesTypes:', error);
            return throwError(() => new Error('Error en getProvincesTypes'));
          })
        );
    } else {
      return this.mockProvincesTypes(pageNumber, pageSize);
    }
  }

  /**
   * Genera dades simulades de tipus de províncies paginades per a fins de prova.
   * @param pageNumber El número de pàgina a simular.
   * @param pageSize El nombre d'elements per pàgina a simular.
   * @returns Un Observable de les dades simulades paginades.
   */
  private mockProvincesTypes(
    pageNumber: number,
    pageSize: number
  ): Observable<PaginatedResponse> {
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = MOCK_PROVINCES.list.slice(
      startIndex,
      endIndex
    ) as Province[];
    const isLast = pageNumber >= MOCK_PROVINCES.totalPages - 1;
    const paginatedResponse: PaginatedResponse = {
      allData: MOCK_PROVINCES.list,
      pageNumber,
      pageSize,
      totalElements: MOCK_PROVINCES.totalElements,
      totalPages: MOCK_PROVINCES.totalPages,
      isLast,
      list: paginatedItems,
    };
    return of(paginatedResponse).pipe(
      delay(50),
      tap((response) =>
        console.log('Resposta simulada de la sol·licitud GET:', response)
      ),
      catchError((error) => {
        console.error('Error ocorregut en mockProvincesTypes:', error);
        return throwError(() => new Error('Error en mockProvincesTypes'));
      })
    );
  }

  /**
   * Recupera un tipus de província per la seva ID.
   * @param id La ID del tipus de província a recuperar.
   * @returns Un Observable del tipus de província.
   */

  getProvinceTypeById(id: number): Observable<Province | null> {
    if (environment.useMockData) {
      return this.mockProvinceById(id);
    } else {
      return this.http
        .get<Province>(`${this.ENDPOINT}/${id}`, { headers: this.getHeaders() })
        .pipe(
          tap((response) =>
            console.log('Resposta de la sol·licitud GET:', response)
          ),
          catchError((error) => {
            console.error('Error ocorregut en getProvinceTypeById:', error);
            return throwError(() => new Error('Error en getProvinceTypeById'));
          })
        );
    }
  }

  /**
   * Genera dades simulades de tipus de províncies paginades per a fins de prova.
   * @param id
   * @returns
   */
  private mockProvinceById(id: number): Observable<Province | null> {
    const province =
      MOCK_PROVINCES.list.find((province) => province.id === id) || null;
    return of(province).pipe(
      delay(50), // Simula un pequeño retraso para la respuesta
      tap(() =>
        console.log(`Resposta simulada per a la província amb ID: ${id}`)
      ),
      catchError((error) => {
        console.error('Error ocorregut en mockProvinceById:', error);
        return throwError(() => new Error('Error en mockProvinceById'));
      })
    );
  }

  /**
   * Crea un nou tipus de província.
   * @param provincesType El tipus de província a crear.
   * @returns Un Observable del nou tipus de província creat.
   */
  createProvincesType(provincesType: Province): Observable<Province> {
    return this.http
      .post<Province>(this.ENDPOINT, provincesType, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((response) =>
          console.log('Resposta de la sol·licitud POST:', response)
        ),
        catchError((error) => {
          console.error('Error ocorregut en createProvincesType:', error);
          return throwError(() => new Error('Error en createProvincesType'));
        })
      );
  }

  /**
   * Actualitza un tipus de província existent.
   * @param id La ID del tipus de província a actualitzar.
   * @param provincesType Les dades actualitzades del tipus de província.
   * @returns Un Observable del tipus de província actualitzat.
   */
  updateProvincesType(
    id: number,
    provincesType: Province
  ): Observable<Province> {
    return this.http
      .put<Province>(`${this.ENDPOINT}/${id}`, provincesType, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((response) =>
          console.log('Resposta de la sol·licitud PUT:', response)
        ),
        catchError((error) => {
          console.error('Error ocorregut en updateProvincesType:', error);
          return throwError(() => new Error('Error en updateProvincesType'));
        })
      );
  }

  /**
   * Elimina un tipus de província per la seva ID.
   * @param id La ID del tipus de província a eliminar.
   * @returns Un Observable que indica el resultat de l'operació d'eliminació.
   */
  deleteProvincesType(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.ENDPOINT}/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap((response) =>
          console.log('Resposta de la sol·licitud DELETE:', response)
        ),
        catchError((error) => {
          console.error('Error ocorregut en deleteProvincesType:', error);
          return throwError(() => new Error('Error en deleteProvincesType'));
        })
      );
  }
}
