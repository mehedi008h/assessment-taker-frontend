import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAssessmentComponent } from './demo-assessment.component';

describe('DemoAssessmentComponent', () => {
  let component: DemoAssessmentComponent;
  let fixture: ComponentFixture<DemoAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
