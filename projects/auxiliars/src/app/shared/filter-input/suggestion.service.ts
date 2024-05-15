import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  constructor(private http: HttpClient) {}

  getSuggestions(
    endpoint: string,
    query: string,
    searchField: string
  ): Observable<any[]> {
    // Asume que el backend espera un objeto con un campo de búsqueda y el término de búsqueda
    const requestBody = {
      searchField: searchField,
      query: query,
    };

    // Usar POST para enviar el objeto de búsqueda
    return this.http.post<any[]>(endpoint, requestBody);
  }
}
