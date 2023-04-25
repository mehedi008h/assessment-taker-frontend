import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { NotificationService } from 'src/app/services/notification.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css'],
})
export class QuestionViewComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public question!: Question;
  errorMessage!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Question,
    public dialogRef: MatDialogRef<QuestionViewComponent>,
    private questionService: QuestionService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getQuestion();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // get question
  public getQuestion(): void {
    this.subscriptions.push(
      this.questionService.getQuestion(this.data.questionIdentifier).subscribe(
        (response: Question) => {
          this.question = response;
          console.log('Response Question:', this.question);
        },
        (errorResponse: HttpErrorResponse) => {
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }
}
