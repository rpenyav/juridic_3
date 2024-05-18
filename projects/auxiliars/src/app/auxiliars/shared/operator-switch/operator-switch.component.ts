import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from 'shared-lib';

@Component({
  selector: 'app-operator-switch',
  templateUrl: './operator-switch.component.html',
  styleUrls: ['./operator-switch.component.scss'],
})
export class OperatorSwitchComponent {
  @Input() operators: { value: string; label: string; icon?: string }[] = [];
  @Output() operatorChanged = new EventEmitter<string>();

  currentOperatorIndex = 0;
  translations: Record<string, any> = {};
  private translationsSubscription: Subscription;

  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    if (this.operators && this.operators.length > 0) {
      this.operatorChanged.emit(
        this.operators[this.currentOperatorIndex].value
      );
    }

    this.translationsSubscription = this.i18nService.translations$.subscribe(
      (translations) => {
        this.translations = translations;
      }
    );
  }

  switchOperator() {
    if (this.operators.length > 0) {
      this.currentOperatorIndex =
        (this.currentOperatorIndex + 1) % this.operators.length;
      this.operatorChanged.emit(
        this.operators[this.currentOperatorIndex].value
      );
    }
  }

  getFontAwesomeClass(): string {
    const icon = this.operators[this.currentOperatorIndex].icon || '';
    return `${icon}`;
  }

  ngOnDestroy() {
    if (this.translationsSubscription) {
      this.translationsSubscription.unsubscribe();
    }
  }
}
