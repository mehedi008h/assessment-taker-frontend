import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmAssessmentComponent } from '../confirm-assessment/confirm-assessment.component';

@Component({
  selector: 'app-user-assessment-details',
  templateUrl: './user-assessment-details.component.html',
  styleUrls: ['./user-assessment-details.component.css'],
})
export class UserAssessmentDetailsComponent {
  readInstruction: boolean = false;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: '',
    };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ConfirmAssessmentComponent, dialogConfig);
    // const dialogRef = this.dialog.open(AddEmployeeComponent, dialogConfig);

    // dialogRef
    //   .afterClosed()
    //   .subscribe((data) => console.log('Dialog output:', data));
  }

  onRead() {
    this.readInstruction = !this.readInstruction;
  }
}
