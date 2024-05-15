import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-operator-switch',
  templateUrl: './operator-switch.component.html',
  styleUrls: ['./operator-switch.component.scss'],
})
export class OperatorSwitchComponent {
  @Input() operators: { value: string; label: string; icon?: string }[] = [];
  @Output() operatorChanged = new EventEmitter<string>();

  currentOperatorIndex = 0;

  ngOnInit() {
    if (this.operators && this.operators.length > 0) {
      this.operatorChanged.emit(
        this.operators[this.currentOperatorIndex].value
      );
    }
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
}
