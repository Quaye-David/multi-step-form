// services/form.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormData } from '../models/form-data.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly STORAGE_KEY = 'multistep_form_data';

  private formData = new BehaviorSubject<FormData>({
    personalInfo: { name: '', email: '', phone: '' },
    plan: { type: 'arcade', isYearly: false, price: 9 },
    addons: []
  });

  formData$ = this.formData.asObservable();

  constructor() {
    this.loadSavedData();
  }

  private loadSavedData(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.formData.next(JSON.parse(saved));
    }
  }

  updatePersonalInfo(data: FormData['personalInfo']): void {
    const current = this.formData.value;
    const updated = { ...current, personalInfo: data };
    this.saveData(updated);
  }

  updatePlan(data: FormData['plan']): void {
    const current = this.formData.value;
    const updated = { ...current, plan: data };
    this.saveData(updated);
  }

  updateAddons(data: FormData['addons']): void {
    const current = this.formData.value;
    const updated = { ...current, addons: data };
    this.saveData(updated);
  }

  private saveData(data: FormData): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    this.formData.next(data);
  }

  isStepValid(step: number): boolean {
    const data = this.formData.value;
    switch(step) {
      case 1:
        return this.isPersonalInfoValid(data.personalInfo);
      case 2:
        return !!data.plan.type;
      case 3:
        return true; // Addons are optional
      case 4:
        return this.isFormValid(data);
      default:
        return false;
    }
  }

  private isPersonalInfoValid(info: FormData['personalInfo']): boolean {
    return !!(info.name && info.email && info.phone);
  }

  private isFormValid(data: FormData): boolean {
    return this.isPersonalInfoValid(data.personalInfo) && !!data.plan.type;
  }
}