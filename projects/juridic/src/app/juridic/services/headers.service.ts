import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class HeadersService {
  constructor(private cookieService: CookieService) {}

  public getAuthHeaders(): HttpHeaders {
    const authToken = this.cookieService.get('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  }
}
