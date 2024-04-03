import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly ENDPOINT = 'http://demo.wad.cat:8014/api/login';
  private loggedIn = new BehaviorSubject<boolean>(
    this.cookieService.check('authToken')
  );

  // Nueva propiedad para almacenar el username
  private usernameSource = new BehaviorSubject<string>('');
  public currentUsername = this.usernameSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });

    return this.http
      .post(this.ENDPOINT, body, { headers, observe: 'response' })
      .pipe(
        tap((response) => {
          let authToken = response.headers.get('Authorization');
          if (authToken) {
            authToken = decodeURIComponent(authToken).split(' ')[1];
            this.cookieService.set('authToken', authToken, { path: '/' });
            this.loggedIn.next(true);
            // Asignar el valor fijo al username después de un login exitoso
            this.usernameSource.next('usuario valido');
            this.router.navigate(['/juridic/juridic']);
          } else {
            // Aquí es donde indicarías que no estás logueado
            console.log('No estás logueado');
          }
        }),
        catchError((error) => {
          console.error('Error de autenticación', error);
          return throwError(() => new Error('Error de autenticación'));
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    const isLogged = this.loggedIn.value;
    if (!isLogged) {
      console.log('No estás logueado'); // Aquí también puedes informar cuando se verifica y no está logueado
    }
    return this.loggedIn.asObservable();
  }

  logout(): void {
    this.cookieService.delete('authToken', '/');
    this.loggedIn.next(false);
    this.usernameSource.next(''); // Resetear el username al hacer logout
    this.router.navigate(['/authentication/authentication']);
  }
}
