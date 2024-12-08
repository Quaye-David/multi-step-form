// can-deactivate.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MultiStepComponent } from '../app/multi-step/multi-step.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<MultiStepComponent> {
  canDeactivate(component: MultiStepComponent): boolean {
    const event = new Event('canDeactivate');
    return component.canDeactivate(event);
  }
}