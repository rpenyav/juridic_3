import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { JuridicModule } from './juridic/juridic.module';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { I18nService } from 'shared-lib';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    JuridicModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
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
