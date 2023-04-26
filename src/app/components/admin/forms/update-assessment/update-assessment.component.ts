import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Assessment } from 'src/app/models/assessment.model';
import { Category } from 'src/app/models/category.model';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-update-assessment',
  templateUrl: './update-assessment.component.html',
  styleUrls: ['./update-assessment.component.css'],
})
export class UpdateAssessmentComponent implements OnInit {
  assessmentIdentifier!: string;
  updateAssessmentFormGroup!: FormGroup;
  submitted: boolean = false;
  public assessment!: Assessment;
  public categories!: Category[];
  public defaultCategory!: Category;
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public showLoading!: boolean;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private categoryService: CategoryService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // get identifier from route
    this.assessmentIdentifier =
      this.route.snapshot.params['assessmentIdentifier'];

    this.getAssessment();
    this.getCategories(true);
  }

  // get categories
  public getCategories(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.categoryService.getCategories().subscribe(
        (response: Category[]) => {
          this.categories = response;
          console.log('Response Categorys:', this.categories);
          this.refreshing = false;
          if (showNotification) {
            this.notification.notify(
              `${response.length} Category(s) loaded successfully.`
            );
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.notification.notify(errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );
  }

  // get assessment
  public getAssessment(): void {
    this.subscriptions.push(
      this.assessmentService.getAssessment(this.assessmentIdentifier).subscribe(
        (response: Assessment) => {
          this.assessment = response;

          // question form validation
          this.updateAssessmentFormGroup = this.fb.group({
            title: [this.assessment.title, Validators.required],
            description: [this.assessment.description, Validators.required],
            time: [this.assessment.time, Validators.required],
            attempt: [this.assessment.attempt, Validators.required],
            category: [this.assessment.category, Validators.required],
          });
          this.defaultCategory =
            this.updateAssessmentFormGroup.controls['category'].value;
        },
        (errorResponse: HttpErrorResponse) => {
          this.errorMessage = errorResponse.error.message;
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }

  // update assessment
  updateassessment() {
    this.submitted = true;
    if (this.updateAssessmentFormGroup.invalid) return;
    this.subscriptions.push(
      this.assessmentService
        .updateAssessment({
          ...this.updateAssessmentFormGroup.value,
          assessmentIdentifier: this.assessment.assessmentIdentifier,
          category: this.assessment.category,
          id: this.assessment.id,
        })
        .subscribe(
          (response: Assessment) => {
            this.showLoading = false;
            this.notification.notify('Assessment Updated Successfully');
          },
          (errorResponse: HttpErrorResponse) => {
            this.showLoading = false;
            this.errorMessage = errorResponse.error.message;
            this.notification.notify(errorResponse.error.message);
          }
        )
    );
  }
}
