import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { Assessment } from 'src/app/models/assessment.model';
import { CustomHttpRespone } from 'src/app/models/custom-http-response';
import { PageResponse } from 'src/app/models/page.response.model';
import { AssessmentService } from 'src/app/services/assessment.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css'],
})
export class AssessmentsComponent implements OnInit {
  assessments$!: Observable<PageResponse<Assessment>>;
  searchFormGroup!: FormGroup;
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.getAssessments();
  }

  // get assessments
  public getAssessments(): void {
    let keyword = this.searchFormGroup.value.keyword;
    this.assessments$ = this.assessmentService
      .getAssessments(keyword, this.currentPage, this.pageSize)
      .pipe(
        catchError((errorResponse) => {
          this.errorMessage = errorResponse.message;
          this.notification.notify(this.errorMessage);
          return throwError(errorResponse);
        })
      );
  }

  // delete assessment
  public onDeleteAssessment(assessmentIdentifier: string): void {
    this.subscriptions.push(
      this.assessmentService.deleteAssessment(assessmentIdentifier).subscribe(
        (response: CustomHttpRespone) => {
          this.notification.notify(response.message);
          this.getAssessments();
        },
        (error: HttpErrorResponse) => {
          this.notification.notify(error.error.message);
        }
      )
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.getAssessments();
  }
}
