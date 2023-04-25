import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assessment } from 'src/app/models/assessment.model';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { AssessmentService } from 'src/app/services/assessment.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PageResponse } from 'src/app/models/page.response.model';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QuestionViewComponent } from '../question-view/question-view.component';
import { CustomHttpRespone } from 'src/app/models/custom-http-response';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrls: ['./assessment-details.component.css'],
})
export class AssessmentDetailsComponent implements OnInit {
  public assessmentIdentifier!: string;
  public assessment!: Assessment;
  public questions$!: Observable<PageResponse<Question>>;
  searchFormGroup!: FormGroup;
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public showLoading!: boolean;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private questionsService: QuestionService,
    private notification: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // get identifier from route
    this.assessmentIdentifier =
      this.route.snapshot.params['assessmentIdentifier'];

    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });

    this.getAssessment();
    this.getQuestions();
  }

  openDialog(identifier: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      questionIdentifier: identifier,
    };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(QuestionViewComponent, dialogConfig);
    // const dialogRef = this.dialog.open(AddEmployeeComponent, dialogConfig);

    // dialogRef
    //   .afterClosed()
    //   .subscribe((data) => console.log('Dialog output:', data));
  }

  // get assessment
  public getAssessment(): void {
    this.subscriptions.push(
      this.assessmentService.getAssessment(this.assessmentIdentifier).subscribe(
        (response: Assessment) => {
          this.assessment = response;
          console.log('Response Assessment:', this.assessment);
        },
        (errorResponse: HttpErrorResponse) => {
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }

  // get questions of assessment
  public getQuestions(): void {
    let keyword = this.searchFormGroup.value.keyword;
    this.questions$ = this.questionsService
      .getQuestionsOfAdmin(
        this.assessmentIdentifier,
        keyword,
        this.currentPage,
        this.pageSize
      )
      .pipe(
        catchError((errorResponse) => {
          this.errorMessage = errorResponse.message;
          this.notification.notify(this.errorMessage);
          return throwError(errorResponse);
        })
      );
  }

  public onDeleteQuestion(questionIdentifier: string): void {
    this.subscriptions.push(
      this.questionsService.deleteQuestion(questionIdentifier).subscribe(
        (response: CustomHttpRespone) => {
          this.notification.notify(response.message);
          this.getQuestions();
        },
        (error: HttpErrorResponse) => {
          this.notification.notify(error.error.message);
        }
      )
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.getQuestions();
  }
}
