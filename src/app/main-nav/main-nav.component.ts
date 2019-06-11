import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {firebase} from 'firebaseui-angular';
import {faDiceD20} from '@fortawesome/free-solid-svg-icons';
import {ChatService} from '../shared/services/chat.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  faDice20 = faDiceD20;
  loggedIn: boolean;

  chatJoined: boolean;
  userLoaded: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private as: AuthService, private router: Router, private chatService: ChatService) {}

  ngOnInit() {
    this.chatJoined = false;
    this.userLoaded = false;
    this.as.getUser().subscribe(
      (user) => {
        if (!user) {
          this.loggedIn = false;
          this.router.navigate(['/home']);
        } else {
          this.loggedIn = true;
          this.userLoaded = true;
          this.connectToChat();
        }
      }
    );
  }
  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/home']);
  }

  connectToChat() {
    const param = {
      displayName: this.as.getUserDisplayName(),
      email: this.as.getUserEmail()
    };
    this.chatService.join(param).subscribe((resp) => {
      this.chatJoined = true;
    }, (error) => {
      alert('Error : ' + error);
    });
  }

}
