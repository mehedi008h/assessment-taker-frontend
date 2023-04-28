import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public user!: User;
  errorMessage!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dialogRef: MatDialogRef<UserViewComponent>,
    private userService: UserService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  // get user
  public getUser(): void {
    this.subscriptions.push(
      this.userService.getUser(this.data.username).subscribe(
        (response: User) => {
          this.user = response;
          console.log('Response User:', this.user);
        },
        (errorResponse: HttpErrorResponse) => {
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
