import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  signup: boolean = false;
  passwordView: boolean = false;
  loginFormGroup!: FormGroup;
  signupFormGroup!: FormGroup;
  submittedLogin: boolean = false;
  submittedSignup: boolean = false;
  errorMessage!: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // login form validation
    this.loginFormGroup = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });

    // signup form validation
    this.signupFormGroup = this.fb.group({
      name: ['', [Validators.required]],
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
  }

  onLogin() {
    this.submittedLogin = true;
    if (this.loginFormGroup.invalid) return;
    console.log(this.loginFormGroup.value);
  }

  onRegister() {
    this.submittedSignup = true;
    if (this.signupFormGroup.invalid) return;
    console.log(this.signupFormGroup.value);
  }

  switchAuthentication() {
    this.signup = !this.signup;
  }

  showPassword() {
    this.passwordView = !this.passwordView;
  }
}
