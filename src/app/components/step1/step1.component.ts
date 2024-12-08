// step1.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit, OnDestroy {
  personalForm!: FormGroup;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    // Load data first, then set up validation
    this.loadSavedData();
  }

  private initForm(): void {
    this.personalForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]+$/)]]
    });
  }

  private loadSavedData(): void {
    // First load saved data
    this.subscription.add(
      this.formDataService.formData$.subscribe(data => {
        if (data?.personalInfo) {
          this.personalForm.patchValue(data.personalInfo, { emitEvent: false });
          // After loading data, set up validation
          this.setupFormValidation();
        }
      })
    );
  }

  private setupFormValidation(): void {
    this.subscription.add(
      this.personalForm.valueChanges.subscribe(() => {
        const formValue = this.personalForm.value;
        this.formDataService.updatePersonalInfo({
          name: formValue.name || '',
          email: formValue.email || '',
          phone: formValue.phone || ''
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}