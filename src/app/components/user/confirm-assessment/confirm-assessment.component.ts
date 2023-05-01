import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Assessment } from 'src/app/models/assessment.model';

@Component({
  selector: 'app-confirm-assessment',
  templateUrl: './confirm-assessment.component.html',
  styleUrls: ['./confirm-assessment.component.css'],
})
export class ConfirmAssessmentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Assessment,
    public dialogRef: MatDialogRef<ConfirmAssessmentComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
