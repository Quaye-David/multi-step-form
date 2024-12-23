import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStepComponent } from './multi-step.component';

describe('MultiStepComponent', () => {
  let component: MultiStepComponent;
  let fixture: ComponentFixture<MultiStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
