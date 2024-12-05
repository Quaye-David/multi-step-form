import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Plan {
  id: 'arcade' | 'advanced' | 'pro';
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: string;
}


@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component {
  selectedPlan: Plan['id'] = 'arcade';
  isYearly = false;

  plans: Plan[] = [
    {
      id: 'arcade',
      title: 'Arcade',
      monthlyPrice: 9,
      yearlyPrice: 90,
      icon: 'assets/images/icon-arcade.svg'
    },
    {
      id: 'advanced',
      title: 'Advanced',
      monthlyPrice: 12,
      yearlyPrice: 120,
      icon: 'assets/images/icon-advanced.svg'
    },
    {
      id: 'pro',
      title: 'Pro',
      monthlyPrice: 15,
      yearlyPrice: 150,
      icon: 'assets/images/icon-pro.svg'
    }
  ];

  toggleBilling() {
    this.isYearly = !this.isYearly;
  }

  selectPlan(planId: Plan['id']) {
    this.selectedPlan = planId;
  }
}