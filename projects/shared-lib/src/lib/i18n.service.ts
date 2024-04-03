import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private locale = new BehaviorSubject<string>(this.getStoredLocale());
  private translations = new BehaviorSubject<Record<string, string>>({});

  public translations$ = this.translations.asObservable(); // Exponer como observable
  public locale$ = this.locale.asObservable(); // Exponer el idioma actual como observable

  constructor(private http: HttpClient) {
    this.setLocale(this.locale.value); // Cargar el idioma almacenado al iniciar
  }

  setLocale(locale: string): void {
    this.locale.next(locale); // Actualizar el BehaviorSubject del idioma
    this.loadTranslations(locale);
    localStorage.setItem('appLocale', locale);
  }

  use(locale: string): void {
    this.setLocale(locale);
    // Aquí puedes añadir más lógica si es necesario
  }

  getStoredLocale(): string {
    return localStorage.getItem('appLocale') || 'en'; // Por defecto, 'en'
  }

  getTranslation(key: string): string {
    return this.translations.value[key] || key;
  }

  // Simula el método instant de TranslateService
  getInstant(key: string): string {
    return this.getTranslation(key);
  }

  private loadTranslations(locale: string) {
    this.http
      .get<Record<string, string>>(`./assets/i18n/${locale}.json`)
      .pipe(
        catchError(() => of({})), // En caso de error, carga un objeto vacío
        tap((translations) => this.translations.next(translations)) // Actualiza las traducciones
      )
      .subscribe();
  }
}
