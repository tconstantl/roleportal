import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Character, SecondaryStat} from '../shared/models/character';
import {ElasticsearchService} from '../shared/services/elasticsearch.service';
import {response} from 'express';
import {firebase} from 'firebaseui-angular';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  isConnected = false;
  status: string;
  chars;
  userId = '';

  constructor(private es: ElasticsearchService, private cd: ChangeDetectorRef, private as: AuthService, private router: Router) {
    this.isConnected = false;
    this.userId = '';
  }
  ngOnInit() {
        this.es.getAllDocuments('characters', '_doc')
      .then(response => {
        this.chars = response.hits.hits;
      }, error => {
        console.error(error);
      });
    this.as.isLoggedIn().subscribe(
      (user) => {
        if (!user) {
          this.router.navigate(['/home']);
        } else {
          this.userId = user.email;
          console.log(this.userId);
        }
      }
    );
  }

  logOut() {
    firebase.auth().signOut();
  }

}


//
// function isLol(element, index, array) {
//   return (element.category === 'lol');
// }


