import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { SharedLibModule } from 'shared-lib';
import { I18nService } from 'shared-lib';
import { AuxiliarModule } from './auxiliars/auxiliar.module';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    AuxiliarModule,
    BrowserModule,

    BrowserAnimationsModule,
    HttpClientModule,
    SharedLibModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  declarations: [HomeComponent, AppComponent],
  bootstrap: [AppComponent],
  exports: [NoopAnimationsModule],
})
export class AppModule {
  constructor(private i18nService: I18nService) {
    this.initializeLocale();
  }

  private initializeLocale(): void {
    const locale = localStorage.getItem('locale') || 'en';
    this.i18nService.setLocale(locale);
  }
}
