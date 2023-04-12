import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public user!: User;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }
}
