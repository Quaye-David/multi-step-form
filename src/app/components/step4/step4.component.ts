// summary.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface SelectedPlan {
  name: string;
  price: number;
  isYearly: boolean;
}

interface SelectedAddon {
  name: string;
  price: number;
}

@Component({
  selector: 'app-step4',
  standalone: true,
  imports: [CommonModule, RouterLink],
templateUrl: './step4.component.html',
  styleUrl: './step4.component.css'
})
export class Step4Component {
  selectedPlan: SelectedPlan = {
    name: 'Arcade',
    price: 9,
    isYearly: false
  };

  selectedAddons: SelectedAddon[] = [
    { name: 'Online service', price: 1 },
    { name: 'Larger storage', price: 2 }
  ];

  get totalPrice(): number {
    const addonsTotal = this.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return this.selectedPlan.price + addonsTotal;
  }
}