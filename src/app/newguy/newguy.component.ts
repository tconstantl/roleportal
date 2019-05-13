import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ElasticsearchService} from '../shared/services/elasticsearch.service';
import {Character} from '../shared/models/character';
import {Router} from '@angular/router';

@Component({
  selector: 'app-newguy',
  templateUrl: './newguy.component.html',
  styleUrls: ['./newguy.component.scss']
})
export class NewguyComponent implements OnInit {
  classes = [];
  newguyForm: FormGroup;

  constructor(private fb: FormBuilder, private es: ElasticsearchService, private router: Router) {
    this.es.getAllDocuments('classes', '_doc')
      .then(response => {
        this.classes = response.hits.hits;
      }, error => {
        console.error(error);
      });

    this.newguyForm = this.fb.group({
      name: new FormControl('', Validators.required),
      class: new FormControl('', Validators.required),
      age: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
      gender: new FormControl(''),
      race: new FormControl('Human', Validators.required),
      hair_color: new FormControl('', Validators.required),
      eyes_color: new FormControl('', Validators.required),
      appearance: new FormControl(null, Validators.required),
      size: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  submitCharacter() {
    let newguy = new Character();
    Object.assign(newguy, this.newguyForm.value);
    this.es.addToIndex('characters', JSON.stringify(newguy)).then((result) => {
      console.log(result);
      alert('Character created, redirecting');
      this.router.navigate(['/home']);
    }, error => {
      alert('Oopsies, we made a doozies');
      console.error(error);
    });
  }

}
