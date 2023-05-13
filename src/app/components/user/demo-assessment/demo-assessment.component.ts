import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-demo-assessment',
  templateUrl: './demo-assessment.component.html',
  styleUrls: ['./demo-assessment.component.css'],
})
export class DemoAssessmentComponent implements OnInit {
  time: any = 6 * 60;
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
  constructor(public dialogRef: MatDialogRef<DemoAssessmentComponent>) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
