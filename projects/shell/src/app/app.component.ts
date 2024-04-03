import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from 'projects/authentication/src/app/authentication.service';
import { I18nService } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'shell';

  constructor(
    private service: AuthenticationService,
    http: HttpClient,
    private i18nService: I18nService
  ) {
    this.service.login('Max', null);
  }

  changeLanguage(lang: string) {
    this.i18nService.setLocale(lang);
  }
}
