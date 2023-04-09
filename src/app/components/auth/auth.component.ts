import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  signup: boolean = false;
  passwordView: boolean = false;
  ngOnInit(): void {}

  switchAuthentication() {
    this.signup = !this.signup;
  }

  showPassword() {
    this.passwordView = !this.passwordView;
  }
}
