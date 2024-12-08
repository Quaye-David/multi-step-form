// multi-step.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { FormDataService } from '../services/form-data.service';
import { Subscription, filter } from 'rxjs';

interface Step {
  number: number;
  title: string;
  label: string;
}

@Component({
  selector: 'app-multi-step',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './multi-step.component.html',
  styleUrl: './multi-step.component.css'
})

export class MultiStepComponent implements OnInit, OnDestroy {
  currentStep = 1;
  isMobile = window.innerWidth < 768;
  isFormValid = false;
  private subscription: Subscription = new Subscription();

  steps: Step[] = [
    { number: 1, title: 'Step 1', label: 'Your info' },
    { number: 2, title: 'Step 2', label: 'Select Plan' },
    { number: 3, title: 'Step 3', label: 'Add-ons' },
    { number: 4, title: 'Step 4', label: 'Summary' },
  ];
  isThankYouPage: any;

  get showButtons(): boolean {
    return !this.isThankYouPage;
  }

  get showBackButton(): boolean {
    return this.currentStep > 1;
  }

  get isLastStep(): boolean {
    return this.currentStep === 4;
  }

  get showNextButton(): boolean {
    return !this.isLastStep && !this.isThankYouPage;
  }

  get showConfirmButton(): boolean {
    return this.isLastStep && !this.isThankYouPage;
  }

  get isNextButtonDisabled(): boolean {
    return !this.isFormValid;
  }

  constructor(
    private readonly router: Router,
    private formDataService: FormDataService
  ) {
    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          const currentUrl = this.router.url;
          this.isThankYouPage = currentUrl.includes('step5');
          if (currentUrl.includes('step') && !this.isThankYouPage) {
            this.currentStep = parseInt(currentUrl.charAt(currentUrl.length - 1));
            this.checkStepValidity();
          }
        })
    );
  }


  ngOnInit(): void {
    // Subscribe to form validity changes
    this.subscription.add(
      this.formDataService.isFormValid$.subscribe(
        isValid => this.isFormValid = isValid
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async checkStepValidity(): Promise<void> {
    try {
      switch(this.currentStep) {
        case 1:
          this.isFormValid = await this.formDataService.isPersonalInfoValid();
          break;
        case 2:
          this.isFormValid = await this.formDataService.isPlanSelected();
          break;
        case 3:
          this.isFormValid = true; // Optional addons
          break;
        case 4:
          this.isFormValid = await this.formDataService.isFormComplete();
          break;
        default:
          this.isFormValid = false;
      }
    } catch (error) {
      console.error('Error checking step validity:', error);
      this.isFormValid = false;
    }
  }

  goNext(): void {
    if (this.isFormValid && this.currentStep < 4) {
      this.currentStep++;
      this.router.navigate(['/multi-step/step' + this.currentStep])
        .catch(error => console.error('Navigation error:', error));
    }
  }

  goBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.router.navigate(['/multi-step/step' + this.currentStep])
        .catch(error => console.error('Navigation error:', error));
    }
  }

  confirmSubscription(): void {
    if (this.isFormValid) {
      this.router.navigate(['/multi-step/step5']);
    }
  }
}