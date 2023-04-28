import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { PageResponse } from 'src/app/models/page.response.model';
import { User } from 'src/app/models/user.model';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { UserViewComponent } from '../user-view/user-view.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users$!: Observable<PageResponse<User>>;
  searchFormGroup!: FormGroup;
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.getUsers();
  }

  // get users
  public getUsers(): void {
    let keyword = this.searchFormGroup.value.keyword;
    this.users$ = this.userService
      .getUsers(keyword, this.currentPage, this.pageSize)
      .pipe(
        catchError((errorResponse) => {
          this.errorMessage = errorResponse.message;
          this.notification.notify(this.errorMessage);
          return throwError(errorResponse);
        })
      );
  }

  openDialog(value: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      username: value,
    };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(UserViewComponent, dialogConfig);
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.getUsers();
  }
}
