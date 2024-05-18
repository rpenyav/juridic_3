import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getApiEndpoints } from '../../../constants/api-endpoints.constants';
import { environment } from 'projects/auxiliars/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarpetasTypeService {
  assetsBaseUrl = '/assets/';
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.CARPETAS_ENDPOINT}`;
  constructor(private http: HttpClient) {}

  getCarpetasTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createCarpetasType(carpetasType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, carpetasType);
  }

  updateCarpetasType(id: number, carpetasType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, carpetasType);
  }

  deleteCarpetasType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
