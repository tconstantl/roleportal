import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Character, SecondaryStat} from '../shared/models/character';
import {ElasticsearchService} from '../shared/services/elasticsearch.service';
import {response} from 'express';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  isConnected = false;
  status: string;
  chars;

  constructor(private es: ElasticsearchService, private cd: ChangeDetectorRef) {
    this.isConnected = false;
  }
  ngOnInit() {
    this.es.isAvailable().then(() => {
      this.status = 'OK';
      this.isConnected = true;
    }, error => {
      this.status = 'ERROR';
      this.isConnected = false;
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
    this.es.getAllDocuments('characters', '1')
      .then(response => {
        this.chars = response.hits.hits;
      }, error => {
        console.error(error);
      });
   /* this.es.addToIndex({
      index: 'characters',
      type: '_doc',
      id: '1234',
      body: {
        name: 'bob',
        class: 'eude',
        age: '87'
      }
    }).then((result) => {
      console.log(result);
      alert('Document added, see logs');
    }, error => {
      alert('Oopsies, we made a doozies');
      console.error(error);
    });*/
  }

}


//
// function isLol(element, index, array) {
//   return (element.category === 'lol');
// }
