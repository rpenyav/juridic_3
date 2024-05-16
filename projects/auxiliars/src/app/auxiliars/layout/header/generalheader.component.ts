import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from 'shared-lib';

@Component({
  selector: 'app-general-header',
  templateUrl: './generalheader.component.html',
  styleUrls: ['./generalheader.component.scss'],
})
export class GeneralHeaderComponent {
  translations: Record<string, any> = {};
  private translationsSubscription: Subscription;
  logoImageUrl: string;
  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    // console.log('User Name', this.authService.currentUsername);
    this.translationsSubscription = this.i18nService.translations$.subscribe(
      (translations) => {
        this.translations = translations;
      }
    );
  }

  ngOnDestroy() {
    if (this.translationsSubscription) {
      this.translationsSubscription.unsubscribe();
    }
  }
}
