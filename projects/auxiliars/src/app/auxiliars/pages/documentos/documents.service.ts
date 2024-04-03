import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getApiEndpoints } from '../../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class DocumentsTypeService {
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.DOCUMENTS_ENDPOINT}`;
  constructor(private http: HttpClient) {}

  getDocumentsTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createDocumentsType(documentsType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, documentsType);
  }

  updateDocumentsType(id: number, documentsType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, documentsType);
  }

  deleteDocumentsType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
