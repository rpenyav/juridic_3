import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParametersTypeService {
  assetsBaseUrl = environment.assetsBaseUrl;
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.DOMAINS_ENDPOINT}`;

  constructor(private http: HttpClient) {}

  getParametersTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createParametersType(parametersType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, parametersType);
  }

  updateParametersType(id: number, parametersType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, parametersType);
  }

  deleteParametersType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
