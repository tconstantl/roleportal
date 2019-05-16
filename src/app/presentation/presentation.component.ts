import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElasticsearchService} from '../shared/services/elasticsearch.service';
import {firebase} from 'firebaseui-angular';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  userId = '';
  userChar;

  constructor(private es: ElasticsearchService, private cd: ChangeDetectorRef, private as: AuthService, private router: Router) {
    this.userId = '';
  }
  ngOnInit() {
    this.as.isLoggedIn().subscribe(
      (user) => {
        if (!user) {
          this.router.navigate(['/home']);
        } else {
          this.userId = user.email;
         this.fetchUserChara();
        }
      }
    );
  }

  logOut() {
    firebase.auth().signOut();
  }

  fetchUserChara() {
    this.es.getDocument('characters', '_doc', 'nUFFsGoBzivQ-Ev_vsYq')
      .then(response => {
        this.userChar = response;
        console.log(this.userChar);
      }, error => {
        console.error(error);
      }
    );
  }

}


//
// function isLol(element, index, array) {
//   return (element.category === 'lol');
// }


