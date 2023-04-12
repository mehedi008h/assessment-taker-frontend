import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public user!: User;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }
}
