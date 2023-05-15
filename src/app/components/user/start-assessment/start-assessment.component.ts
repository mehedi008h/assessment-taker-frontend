import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, fromEvent, takeUntil, Subscription } from 'rxjs';
import { Assessment } from 'src/app/models/assessment.model';
import { Question } from 'src/app/models/question.model';
import { AssessmentService } from 'src/app/services/assessment.service';
import { NotificationService } from 'src/app/services/notification.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-assessment',
  templateUrl: './start-assessment.component.html',
  styleUrls: ['./start-assessment.component.css'],
})
export class StartAssessmentComponent implements OnInit, OnDestroy {
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
  time!: number;
  markGot: number = 0;
  correctAnswers: number = 0;
  private unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionService,
    private assessmentService: AssessmentService,
    public notification: NotificationService
  ) {}

  ngOnInit(): void {
    // get identifier from route
    this.assessmentIdentifier =
      this.route.snapshot.params['assessmentIdentifier'];
    this.preventBackButton();
    this.getAssessment();
    this.getQuestions();
  }

  preventBackButton() {
    history.pushState(null, '');
    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((_) => {
        history.pushState(null, '');
        this.notification.notify(
          `You can't make changes or go back at this time.`
        );
      });
  }

  // get assessment
  public getAssessment(): void {
    this.subscriptions.push(
      this.assessmentService.getAssessment(this.assessmentIdentifier).subscribe(
        (response: Assessment) => {
          this.assessment = response;
          this.time = this.assessment.time * 60;
        },
        (errorResponse: HttpErrorResponse) => {
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }

  // get questions of assessment
  public getQuestions() {
    this.subscriptions.push(
      this.questionsService
        .getQuestionsOfUser(this.assessmentIdentifier)
        .subscribe(
          (response: Question[]) => {
            this.questions = response;
            // calculate total mark
            this.totalMark = this.questions.reduce((sum, q) => sum + q.mark, 0);
            this.questions.forEach((q) => {
              q['givenAnswer'] = '';
            });
            this.startTimer();
            console.log('Questions', this.questions);
          },
          (errorResponse: HttpErrorResponse) => {
            this.notification.notify(errorResponse.error.message);
          }
        )
    );
  }

  submitAssessment() {
    Swal.fire({
      title: 'Do you want to submit the assessment?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      cancelButtonText: `No`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  // cancel & save assessmnet
  onCancleAssessment() {
    Swal.fire({
      title: 'Do you want to quite the assessment?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
      icon: 'warning',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  evalQuiz() {
    //calculation
    this.subscriptions.push(
      this.assessmentService
        .evalAssessment(this.questions, this.assessmentIdentifier)
        .subscribe(
          (response: HttpResponse<Question[]>) => {
            this.showLoading = false;
            this.notification.notify('Assesment Saved Successfully');
            console.log('Response : ', response);
          },
          (errorResponse: HttpErrorResponse) => {
            this.showLoading = false;
            this.notification.notify(errorResponse.error.message);
          }
        )
    );
    this.questions.forEach((q) => {
      if (q.givenAnswer == q.questionAnswer) {
        this.correctAnswers++;
        this.markGot = this.markGot + q.mark;
      }
    });

    console.log('Correct Answers :' + this.correctAnswers);
    console.log('Marks Got ' + this.markGot);

    console.log(this.questions);
  }

  getParcent(): number {
    return Math.floor(((this.time / 60) * 100) / this.assessment.time);
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.time <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.time--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.time / 60);
    let ss = this.time - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
