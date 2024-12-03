import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-multi-step',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
templateUrl: './multi-step.component.html',
  styleUrl: './multi-step.component.css'
})
export class MultiStepComponent {

}
