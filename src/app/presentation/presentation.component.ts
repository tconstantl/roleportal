import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElasticsearchService} from '../shared/services/elasticsearch.service';
import {AuthService} from '../shared/services/auth.service';
import {User} from 'firebase';
import {Character} from '../shared/models/character';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  user: User;
  userChar: Character;
  loadingChar: boolean;
  faEditButton = faUserEdit;
  newguyForm: FormGroup;
  classes = [];

  constructor(private es: ElasticsearchService, private cd: ChangeDetectorRef, private as: AuthService, private fb: FormBuilder, private router: Router) {
    this.es.getAllDocuments('classes', '_doc')
      .then(response => {
        this.classes = response.hits.hits;
      }, error => {
        console.error(error);
      });
  }
  ngOnInit() {
    this.loadingChar = true;
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
        this.generateForm();
        this.newguyForm.disable();
        this.loadingChar = false;
      }, error => {
        this.userChar = new Character();
        this.generateForm();
        console.error(error);
        this.newguyForm.disable();
        this.loadingChar = false;
      }
    );
  }

  generateForm() {
    this.newguyForm = this.fb.group({
      name: new FormControl(this.userChar.name, Validators.required),
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

  submitCharacter() {
    Object.assign(this.userChar, this.newguyForm.value);
    this.es.updateDocument('characters', this.userChar, this.user.uid).then((result) => {
      console.log(result);
      alert('Character updated');
    }, error => {
      alert('Oopsies, we made a doozies');
      console.error(error);
    });
  }

  toggleChange(changeEvent) {
    if (!this.newguyForm.enabled) {
      this.newguyForm.enable();
    } else {
      this.newguyForm.disable();
    }
  }

}

