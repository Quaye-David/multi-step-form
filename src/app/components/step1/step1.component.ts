// step1.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit, OnDestroy {
  personalForm!: FormGroup;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSavedData();
    this.setupFormValidation();
  }

  private initForm(): void {
    this.personalForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]+$/)]]
    });
  }

  private loadSavedData(): void {
    this.subscription.add(
      this.formDataService.formData$.subscribe(data => {
        if (data?.personalInfo) {
          this.personalForm.patchValue(data.personalInfo);
        }
      })
    );
  }

  private setupFormValidation(): void {
    this.subscription.add(
      this.personalForm.valueChanges.subscribe(() => {
        if (this.personalForm.valid) {
          this.formDataService.updatePersonalInfo(this.personalForm.value);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}