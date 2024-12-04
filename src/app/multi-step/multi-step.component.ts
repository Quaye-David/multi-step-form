// multi-step.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Step {
  number: number;
  title: string;
  label: string;
}

@Component({
  selector: 'app-multi-step',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './multi-step.component.html',
  styleUrl: './multi-step.component.css'
})
export class MultiStepComponent {
  currentStep = 1;
  steps: Step[] = [
    { number: 1, title: 'Step 1', label: 'Your info' },
    { number: 2, title: 'Step 2', label: 'Select Plan' },
    { number: 3, title: 'Step 3', label: 'Add-ons' },
    { number: 4, title: 'Step 4', label: 'Summary' },
  ];

  constructor(private router: Router) {
    // Update current step based on URL
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      if (currentUrl.includes('step')) {
        this.currentStep = parseInt(currentUrl.charAt(currentUrl.length - 1));
      }
    });
  }

  get isThankYouPage(): boolean {
    return this.router.url.includes('step5');
  }

  get showButtons(): boolean {
    return !this.isThankYouPage;
  }

  get showBackButton(): boolean {
    return this.currentStep > 1;
  }

  get isLastStep(): boolean {
    return this.currentStep === 4;
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.router.navigate(['/multi-step/step' + this.currentStep]);
    }
  }

  goNext() {
    if (this.currentStep < 4) {
      this.currentStep++;
      this.router.navigate(['/multi-step/step' + this.currentStep]);
    }
  }

  confirmSubscription() {
    this.router.navigate(['/multi-step/step5']);
  }
}