import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Assessment } from 'src/app/models/assessment.model';
import { Question } from 'src/app/models/question.model';
import { AssessmentService } from 'src/app/services/assessment.service';
import { NotificationService } from 'src/app/services/notification.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  assessmentIdentifier!: string;
  addQuestionFormGroup!: FormGroup;
  submitted: boolean = false;
  public assessment!: Assessment;
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public showLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private questionService: QuestionService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // get identifier from route
    this.assessmentIdentifier =
      this.route.snapshot.params['assessmentIdentifier'];

    this.getAssessment();
    // assessment form validation
    this.addQuestionFormGroup = this.fb.group({
      content: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      option5: [''],
      mark: ['', Validators.required],
      questionAnswer: ['', Validators.required],
    });
  }

  // get categories
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

  addQuestion() {
    this.submitted = true;
    if (this.addQuestionFormGroup.invalid) return;
    this.subscriptions.push(
      this.questionService
        .addQuestion({
          ...this.addQuestionFormGroup.value,
          assessment: this.assessment,
        })
        .subscribe(
          (response: HttpResponse<Question>) => {
            this.showLoading = false;
            this.notification.notify('Question Added Successfully');
          },
          (errorResponse: HttpErrorResponse) => {
            this.showLoading = false;
            this.notification.notify(errorResponse.error.message);
          }
        )
    );
    console.log(this.addQuestionFormGroup.value);
  }
}
