import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { NotificationService } from 'src/app/services/notification.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  questionIdentifier!: string;
  updateQuestionFormGroup!: FormGroup;
  submitted: boolean = false;
  public question!: Question;
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public showLoading!: boolean;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionService: QuestionService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // get identifier from route
    this.questionIdentifier = this.route.snapshot.params['questionIdentifier'];

    this.getQuestion();
  }

  // get question
  public getQuestion(): void {
    this.subscriptions.push(
      this.questionService.getQuestion(this.questionIdentifier).subscribe(
        (response: Question) => {
          this.question = response;
          // question form validation
          this.updateQuestionFormGroup = this.fb.group({
            content: [this.question.content, Validators.required],
            option1: [this.question.option1, Validators.required],
            option2: [this.question.option2, Validators.required],
            option3: [this.question.option3, Validators.required],
            option4: [this.question.option4, Validators.required],
            option5: [this.question.option5],
            mark: [this.question.mark, Validators.required],
            questionAnswer: [this.question.questionAnswer, Validators.required],
          });
        },
        (errorResponse: HttpErrorResponse) => {
          this.errorMessage = errorResponse.error.message;
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }

  // update question
  updateQuestion() {
    this.submitted = true;
    if (this.updateQuestionFormGroup.invalid) return;
    this.subscriptions.push(
      this.questionService
        .updateQuestion({
          ...this.updateQuestionFormGroup.value,
          questionIdentifier: this.question.questionIdentifier,
          assessment: this.question.assessment,
          id: this.question.id,
        })
        .subscribe(
          (response: Question) => {
            this.showLoading = false;
            this.notification.notify('Question Updated Successfully');
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
