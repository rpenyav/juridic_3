import { Component } from '@angular/core';
import { I18nService } from 'shared-lib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private i18nService: I18nService) {}

  changeLanguage(lang: string) {
    this.i18nService.setLocale(lang);
  }
}
