import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  loggedIn = false;
  userEmail = '';

  constructor(private as: AuthService) {
    this.loggedIn = false;
  }

  ngOnInit() {
    this.as.isLoggedIn().subscribe((user) =>{
      if (user) {
        this.loggedIn = true;
        this.userEmail = user.email;
      }
    });
  }

}
