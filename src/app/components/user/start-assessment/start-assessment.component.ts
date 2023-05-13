import { LocationStrategy } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-assessment',
  templateUrl: './start-assessment.component.html',
  styleUrls: ['./start-assessment.component.css'],
})
export class StartAssessmentComponent implements OnInit, OnDestroy {
  time: any = 6 * 60;
  private unsubscriber: Subject<void> = new Subject<void>();
  assessments = [
    {
      id: 1,
      content: 'The Bellmann Ford Algorithm returns __________  value?',
      option1: 'String',
      option2: 'Boolean',
      option3: 'Double',
      option4: 'Integer',
      answer: 'Boolean',
      mark: 2,
      givenAnswer: '',
    },
    {
      id: 2,
      content:
        'Which of the following is used for solving the N Queens Problem?',
      option1: 'Greedy algorithm',
      option2: 'Dynamic Programing',
      option3: 'Backtracking',
      option4: 'Sorting',
      answer: 'Backtracking',
      mark: 1.5,
      givenAnswer: '',
    },
    {
      id: 3,
      content: 'The function f : A → B defined by f(x) = 4x + 7, x ∈ R is',
      option1: 'one-one',
      option2: 'Many-one',
      option3: 'Odd',
      option4: 'Even',
      answer: 'one-one',
      mark: 3,
      givenAnswer: '',
    },
    {
      id: 4,
      content:
        'The number of bijective functions from set A to itself when A contains 106 elements is',
      option1: '106',
      option2: '(106)2',
      option3: '106!',
      option4: '2106',
      answer: '106!',
      mark: 3,
      givenAnswer: '',
    },
  ];
  constructor(
    private locationSt: LocationStrategy,
    public notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.startAssessment();
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

  startAssessment() {
    this.startTimer();
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the assessment?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      cancelButtonText: `No`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
      }
    });
  }

  onCancleAssessment() {
    Swal.fire({
      title: 'Do you want to quite the assessment?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
      icon: 'warning',
    }).then((e) => {
      if (e.isConfirmed) {
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.time <= 0) {
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
