// navigation-buttons.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-buttons',
  standalone: true,
  styleUrls: ['../../multi-step/multi-step.component.css'],
  template: `
    <div class="multi-step__buttons">
      @if (showBackButton) {
        <button
          class="multi-step__button multi-step__button--back"
          (click)="onBack.emit()">
          Go Back
        </button>
      }

      @if (showNextButton) {
        <button
          class="multi-step__button multi-step__button--next"
          [disabled]="isNextDisabled"
          (click)="onNext.emit()">
          Next Step
        </button>
      }

      @if (showConfirmButton) {
        <button
          class="multi-step__button multi-step__button--confirm"
          [disabled]="isNextDisabled"
          (click)="onConfirm.emit()">
          Confirm
        </button>
      }
    </div>
  `
})
export class NavigationButtonsComponent {
  @Input() showBackButton = false;
  @Input() showNextButton = false;
  @Input() showConfirmButton = false;
  @Input() isNextDisabled = false;

  @Output() onBack = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();
}