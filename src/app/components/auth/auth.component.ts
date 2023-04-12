import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enums/header-type.enum';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public showLoading!: boolean;
  private subscriptions: Subscription[] = [];
  signup: boolean = false;
  passwordView: boolean = false;
  loginFormGroup!: FormGroup;
  signupFormGroup!: FormGroup;
  submittedLogin: boolean = false;
  submittedSignup: boolean = false;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // login form validation
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // signup form validation
    this.signupFormGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });

    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  // login
  onLogin() {
    this.submittedLogin = true;
    if (this.loginFormGroup.invalid) return;
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(this.loginFormGroup.value).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN) as string;
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/admin');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.showLoading = false;
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }

  // register
  onRegister() {
    this.submittedSignup = true;
    if (this.signupFormGroup.invalid) return;
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(this.signupFormGroup.value).subscribe(
        (response: User) => {
          this.showLoading = false;
          this.notification.notify('Account created successfully');
        },
        (errorResponse: HttpErrorResponse) => {
          this.showLoading = false;
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }

  switchAuthentication() {
    this.signup = !this.signup;
  }

  showPassword() {
    this.passwordView = !this.passwordView;
  }
}
