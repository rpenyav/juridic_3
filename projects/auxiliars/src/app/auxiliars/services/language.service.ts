import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>(
    this.getLocale()
  );
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  setLocale(lang: string): void {
    localStorage.setItem('appLocale', lang);
    this.currentLanguageSubject.next(lang);
  }

  getLocale(): string {
    return localStorage.getItem('appLocale') || 'es';
  }
}
