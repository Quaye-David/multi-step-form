import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormService } from '../../services/form-data.interface';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css',
})
export class Step1Component implements OnInit {
  toggleBilling() {
    throw new Error('Method not implemented.');
  }
  personalForm!: FormGroup;
  isYearly: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly formService: FormService
  ) {}

  ngOnInit() {
    this.personalForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });

    this.formService.formData$.subscribe((data) => {
      if (data.personalInfo) {
        this.personalForm.patchValue(data.personalInfo);
      }
    });

    this.personalForm.valueChanges.subscribe((values) => {
      if (this.personalForm.valid) {
        this.formService.updatePersonalInfo(values);
      }
    });
  }
}
