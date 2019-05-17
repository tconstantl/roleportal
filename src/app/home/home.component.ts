import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  loggedIn = false;
  userDisplayName = '';

  constructor(private as: AuthService) {
    this.loggedIn = false;
  }

  ngOnInit() {
    this.as.getUser().subscribe((user) => {
      if (user) {
        this.loggedIn = true;
        this.userDisplayName = user.displayName;
      } else {
        this.loggedIn = false;
      }
    });
  }

}
