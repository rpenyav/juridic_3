import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'projects/authentication/src/app/authentication.service';
import { I18nService } from 'shared-lib';

@Component({
  selector: 'app-juridic',
  templateUrl: './juridic.component.html',
})
export class JuridicComponent implements OnInit, OnDestroy {
  translations: Record<string, string> = {};
  private translationsSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    console.log('User Name', this.authService.currentUsername);
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
