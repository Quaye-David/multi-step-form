import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MultiStepComponent } from './multi-step/multi-step.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'landing-page', component: LandingPageComponent},
  { path: 'multi-step', component: MultiStepComponent},
];
