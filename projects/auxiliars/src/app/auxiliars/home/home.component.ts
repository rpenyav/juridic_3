import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { I18nService } from 'shared-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  translations: Record<string, any> = {};
  public translationsSubscription: Subscription;
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.translationsSubscription = this.i18nService.translations$.subscribe(
      (translations: Record<string, any>) => {
        this.translations = translations;
      },
      (error) => console.error('Error loading translations', error)
    );
  }
}
