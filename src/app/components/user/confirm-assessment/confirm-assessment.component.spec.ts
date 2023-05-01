import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAssessmentComponent } from './confirm-assessment.component';

describe('ConfirmAssessmentComponent', () => {
  let component: ConfirmAssessmentComponent;
  let fixture: ComponentFixture<ConfirmAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
