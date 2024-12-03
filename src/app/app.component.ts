import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//components
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MultiStepComponent } from './multi-step/multi-step.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingPageComponent, MultiStepComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Multi-Step-Form';
}
