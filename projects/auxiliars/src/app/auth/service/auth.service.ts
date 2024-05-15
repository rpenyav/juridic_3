import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { getApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  assetsBaseUrl = environment.assetsBaseUrl;
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.LOGIN}`;

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loggedIn.next(!!this.cookieService.get('authToken'));
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });

    return this.http
      .post<any>(this.ENDPOINT, body, { headers, observe: 'response' })
      .pipe(
        tap((response) => {
          const token = response.headers.get('Authorization');
          if (token) {
            const tokenValue = token.split(' ')[1];
            this.cookieService.set('authToken', tokenValue, {
              expires: 8,
              secure: window.location.protocol === 'https:',
              sameSite: 'Lax',
            });

            this.loggedIn.next(true);
            console.log('Login exitoso', tokenValue);

            const lang = this.cookieService.get('lang') || 'ca';

            this.router.navigate([`/${lang}/home`]);
          }
        }),
        catchError((error) => {
          console.error('Error en el servicio de autenticación', error);
          return throwError(
            () => new Error('Error de conexión con el servidor')
          );
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    this.cookieService.delete('authToken');
    this.loggedIn.next(false);
    const lang = this.cookieService.get('lang') || 'ca';
    this.router.navigate([`/${lang}/login`]);
  }
}
