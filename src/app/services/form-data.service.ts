// form-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormData } from '../models/form-data.interface';


@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData: FormData = {
    personalInfo: { name: '', email: '', phone: '' },
    plan: { type: '', isYearly: false }
  };

  private formDataSubject = new BehaviorSubject<FormData>(this.formData);
  private formValidSubject = new BehaviorSubject<boolean>(false);

  formData$ = this.formDataSubject.asObservable();
  isFormValid$ = this.formValidSubject.asObservable();

  constructor() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      this.formData = JSON.parse(savedData);
      this.formDataSubject.next(this.formData);
      this.validatePersonalInfo();
    }
  }

  updatePersonalInfo(info: FormData['personalInfo']) {
    this.formData = {
      ...this.formData,
      personalInfo: info
    };
    this.formDataSubject.next(this.formData);
    this.saveToLocalStorage();
    this.validatePersonalInfo();
  }

  private validatePersonalInfo(): void {
    const { name, email, phone } = this.formData.personalInfo;
    const isValid = !!(name && email && phone);
    this.formValidSubject.next(isValid);
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('formData', JSON.stringify(this.formData));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }

  async isPersonalInfoValid(): Promise<boolean> {
    const { name, email, phone } = this.formData.personalInfo;
    return Boolean(name && email && phone);
  }

  async isPlanSelected(): Promise<boolean> {
    return Boolean(this.formData.plan.type);
  }

  async isFormComplete(): Promise<boolean> {
    const personalInfoValid = await this.isPersonalInfoValid();
    const planSelected = await this.isPlanSelected();
    return personalInfoValid && planSelected;
  }

  validateForm(): void {
    this.isPersonalInfoValid().then(isValid => {
      this.formValidSubject.next(isValid);
    });
  }

  private loadFromLocalStorage(): void {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      try {
        this.formData = JSON.parse(savedData);
        this.formDataSubject.next(this.formData);
        this.validatePersonalInfo();
      } catch (error) {
        console.error('Error loading form data:', error);
        localStorage.removeItem('formData');
      }
    }
  }
}