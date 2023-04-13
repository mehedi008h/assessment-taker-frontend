import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Assessment } from 'src/app/models/assessment.model';
import { Category } from 'src/app/models/category.model';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css'],
})
export class AddAssessmentComponent implements OnInit {
  addAssessmentFormGroup!: FormGroup;
  submitted: boolean = false;
  public categories!: Category[];
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public showLoading!: boolean;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private assessmentService: AssessmentService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // assessment form validation
    this.addAssessmentFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      time: ['', Validators.required],
      attempt: ['', Validators.required],
      category: [null, Validators.required],
    });

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

  // add new assessment
  addAssessment() {
    this.submitted = true;
    if (this.addAssessmentFormGroup.invalid) return;
    this.subscriptions.push(
      this.assessmentService
        .addAssessment(this.addAssessmentFormGroup.value)
        .subscribe(
          (response: HttpResponse<Assessment>) => {
            this.showLoading = false;
            this.notification.notify('Create Assesment Successfully');
          },
          (errorResponse: HttpErrorResponse) => {
            this.showLoading = false;
            this.notification.notify(errorResponse.error.message);
          }
        )
    );
    console.log(this.addAssessmentFormGroup.value);
  }
}
