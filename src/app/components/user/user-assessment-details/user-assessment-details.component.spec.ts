import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentDetailsComponent } from './user-assessment-details.component';

describe('UserAssessmentDetailsComponent', () => {
  let component: UserAssessmentDetailsComponent;
  let fixture: ComponentFixture<UserAssessmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssessmentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAssessmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
