import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentComponent } from './user-assessment.component';

describe('UserAssessmentComponent', () => {
  let component: UserAssessmentComponent;
  let fixture: ComponentFixture<UserAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
