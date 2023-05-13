import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmAssessmentComponent } from '../confirm-assessment/confirm-assessment.component';
import { NotificationService } from 'src/app/services/notification.service';
import { DemoAssessmentComponent } from '../demo-assessment/demo-assessment.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AssessmentService } from 'src/app/services/assessment.service';
import { QuestionService } from 'src/app/services/question.service';
import { Assessment } from 'src/app/models/assessment.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-user-assessment-details',
  templateUrl: './user-assessment-details.component.html',
  styleUrls: ['./user-assessment-details.component.css'],
})
export class UserAssessmentDetailsComponent implements OnInit {
  public assessmentIdentifier!: string;
  public assessment!: Assessment;
  public questions!: Question[];
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public showLoading!: boolean;
  readInstruction: boolean = false;
  totalMark: number = 0;
  error: boolean = true;
  errorMessage!: string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private questionsService: QuestionService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // get identifier from route
    this.assessmentIdentifier =
      this.route.snapshot.params['assessmentIdentifier'];

    this.getAssessment();
    this.getQuestions();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    if (!this.readInstruction) {
      this.notification.notify('Please read the instructions cearfully before');
      this.error = true;
      return;
    }

    dialogConfig.data = {
      title: '',
    };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ConfirmAssessmentComponent, dialogConfig);
  }

  // get assessment
  public getAssessment(): void {
    this.subscriptions.push(
      this.assessmentService.getAssessment(this.assessmentIdentifier).subscribe(
        (response: Assessment) => {
          this.assessment = response;
        },
        (errorResponse: HttpErrorResponse) => {
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }

  // get questions of assessment
  public getQuestions(): void {
    this.subscriptions.push(
      this.questionsService
        .getQuestionsOfUser(this.assessmentIdentifier)
        .subscribe(
          (response: Question[]) => {
            this.questions = response;
            console.log('Questions', this.questions);
            // calculate total mark
            this.totalMark = this.questions.reduce((sum, q) => sum + q.mark, 0);
          },
          (errorResponse: HttpErrorResponse) => {
            this.notification.notify(errorResponse.error.message);
          }
        )
    );
  }

  // demo assessment
  openDemoAssessment(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DemoAssessmentComponent, dialogConfig);
  }

  // check read instruction
  onRead() {
    this.readInstruction = !this.readInstruction;
    if (!this.readInstruction) {
      this.error = true;
    } else {
      this.error = false;
    }
  }
}
