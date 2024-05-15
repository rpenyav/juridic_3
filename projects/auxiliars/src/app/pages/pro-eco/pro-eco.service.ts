import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProEcoTypeService {
  assetsBaseUrl = environment.assetsBaseUrl;
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.PRO_ECO}`;
  constructor(private http: HttpClient) {}

  getProEcoTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createProEcoType(proEcoType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, proEcoType);
  }

  updateProEcoType(id: number, proEcoType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, proEcoType);
  }

  deleteProEcoType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
