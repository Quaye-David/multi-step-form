import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component {
  selectedPlan: 'arcade' | 'advanced' | 'pro' = 'arcade';
  isYearly = false;

  toggleBilling() {
    this.isYearly = !this.isYearly;
  }
}