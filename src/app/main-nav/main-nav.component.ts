import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {firebase} from 'firebaseui-angular';
import {faDiceD20} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  faDice20 = faDiceD20;
  loggedIn: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private as: AuthService, private router: Router) {}

  ngOnInit() {
    this.as.getUser().subscribe(
      (user) => {
        if (!user) {
          this.loggedIn = false;
          this.router.navigate(['/home']);
        } else {
          this.loggedIn = true;
        }
      }
    );
  }
  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/home']);
  }

}
