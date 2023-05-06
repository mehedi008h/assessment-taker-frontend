import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-demo-assessment',
  templateUrl: './demo-assessment.component.html',
  styleUrls: ['./demo-assessment.component.css'],
})
export class DemoAssessmentComponent implements OnInit {
  time: any = 30 * 60;
  constructor(public dialogRef: MatDialogRef<DemoAssessmentComponent>) {}

  ngOnInit(): void {
    this.startAssessment();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  startAssessment() {
    this.startTimer();
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
}
