// multi-step.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { FormDataService } from '../services/form-data.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-multi-step',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './multi-step.component.html',
  styleUrls: ['./multi-step.component.css']
})
export class MultiStepComponent implements OnInit, OnDestroy {
  currentStep = 1;
  isMobile = window.innerWidth < 768;
  isFormValid = false;
  isThankYouPage = false;
  private subscription: Subscription = new Subscription();

  steps = [
    { number: 1, title: 'Your Info', label: 'Step 1' },
    { number: 2, title: 'Select Plan', label: 'Step 2' },
    { number: 3, title: 'Add-ons', label: 'Step 3' },
    { number: 4, title: 'Summary', label: 'Step 4' },
  ];

  constructor(
    private router: Router,
    private formDataService: FormDataService
  ) {
    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          const currentUrl = this.router.url;
          this.isThankYouPage = currentUrl.includes('step5');
          const stepMatch = currentUrl.match(/step(\d+)/);
          if (stepMatch) {
            this.currentStep = parseInt(stepMatch[1], 10);
            this.checkStepValidity();
          }
        })
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.formDataService.isFormValid$.subscribe(
        isValid => this.isFormValid = isValid
      )
    );
  }

  checkStepValidity(): void {
    // Additional step-specific validation can be implemented here
  }

  goNext(): void {
    if (this.isFormValid && this.currentStep < this.steps.length) {
      this.currentStep++;
      this.router.navigate([`/multi-step/step${this.currentStep}`]);
    }
  }

  goBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.router.navigate([`/multi-step/step${this.currentStep}`]);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate(event: Event): boolean {
    return this.isFormValid || this.currentStep === 1;
  }

  confirmSubscription(): void {
    if (this.isFormValid) {
      this.router.navigate(['/multi-step/step5']);
    }
  }

  get showButtons(): boolean {
    return !this.isThankYouPage;
  }

  get showBackButton(): boolean {
    return this.currentStep > 1;
  }

  get showNextButton(): boolean {
    return this.currentStep < this.steps.length && !this.isThankYouPage;
  }

  get showConfirmButton(): boolean {
    return this.currentStep === this.steps.length && !this.isThankYouPage;
  }

  get isLastStep(): boolean {
    return this.currentStep === this.steps.length;
  }

  get isNextButtonDisabled(): boolean {
    return !this.isFormValid;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}