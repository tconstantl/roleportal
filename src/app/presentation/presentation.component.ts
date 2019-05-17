import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElasticsearchService} from '../shared/services/elasticsearch.service';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from 'firebase';
import {Character} from '../shared/models/character';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  user: User;
  userChar: Character;

  constructor(private es: ElasticsearchService, private cd: ChangeDetectorRef, private as: AuthService, private router: Router) {}
  ngOnInit() {
   this.as.getUser().subscribe((user) => {
     this.user = user;
     this.fetchUserChara(user.uid);
   });
  }

  fetchUserChara(id) {
    this.es.getDocument('characters', '_doc', id)
      .then(response => {
        this.userChar = response._source;
        console.log(this.userChar);
      }, error => {
        console.error(error);
      }
    );
  }

}

