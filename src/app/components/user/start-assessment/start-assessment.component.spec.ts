import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAssessmentComponent } from './start-assessment.component';

describe('StartAssessmentComponent', () => {
  let component: StartAssessmentComponent;
  let fixture: ComponentFixture<StartAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
