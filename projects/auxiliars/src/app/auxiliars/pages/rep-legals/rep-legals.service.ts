import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getApiEndpoints } from '../../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class RepLegalsTypeService {
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.REP_LEGAL_ENDPOINT}`;

  constructor(private http: HttpClient) {}

  getRepLegalsTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createRepLegalsType(repLegalsType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, repLegalsType);
  }

  updateRepLegalsType(id: number, repLegalsType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, repLegalsType);
  }

  deleteRepLegalsType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
