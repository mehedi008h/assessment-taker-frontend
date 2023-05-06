import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmAssessmentComponent } from '../confirm-assessment/confirm-assessment.component';
import { NotificationService } from 'src/app/services/notification.service';
import { DemoAssessmentComponent } from '../demo-assessment/demo-assessment.component';

@Component({
  selector: 'app-user-assessment-details',
  templateUrl: './user-assessment-details.component.html',
  styleUrls: ['./user-assessment-details.component.css'],
})
export class UserAssessmentDetailsComponent {
  readInstruction: boolean = false;
  errorMessage: boolean = true;

  constructor(
    public dialog: MatDialog,
    private notification: NotificationService
  ) {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    if (!this.readInstruction) {
      this.notification.notify('Please read the instructions cearfully before');
      this.errorMessage = true;
      return;
    }

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

  openDemoAssessment(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DemoAssessmentComponent, dialogConfig);
  }

  onRead() {
    this.readInstruction = !this.readInstruction;
    if (!this.readInstruction) {
      this.errorMessage = true;
    } else {
      this.errorMessage = false;
    }
  }
}
