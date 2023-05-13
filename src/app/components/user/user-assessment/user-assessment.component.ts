import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { Assessment } from 'src/app/models/assessment.model';
import { PageResponse } from 'src/app/models/page.response.model';
import { AssessmentService } from 'src/app/services/assessment.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-user-assessment',
  templateUrl: './user-assessment.component.html',
  styleUrls: ['./user-assessment.component.css'],
})
export class UserAssessmentComponent implements OnInit {
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

  gotoPage(page: number) {
    this.currentPage = page;
    this.getAssessments();
  }
}
