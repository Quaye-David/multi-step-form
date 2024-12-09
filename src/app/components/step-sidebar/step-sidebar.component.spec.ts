import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSidebarComponent } from './step-sidebar.component';

describe('StepSidebarComponent', () => {
  let component: StepSidebarComponent;
  let fixture: ComponentFixture<StepSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
