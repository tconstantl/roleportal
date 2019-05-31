import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElasticsearchService} from '../shared/services/elasticsearch.service';
import {AuthService} from '../shared/services/auth.service';
import {User} from 'firebase';
import {Character} from '../shared/models/character';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';


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
  creating: boolean;

  constructor(private es: ElasticsearchService, private cd: ChangeDetectorRef, private as: AuthService, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar) {
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
        this.creating = false;
      }, error => {
        this.userChar = new Character();
        this.generateForm();
        console.error(error);
        this.newguyForm.disable();
        this.loadingChar = false;
        this.creating = true;
      }
    );
  }

  generateForm() {
    this.newguyForm = this.fb.group({
      name: new FormControl(this.userChar.name, Validators.required),
      class: new FormControl(this.userChar.class, Validators.required),
      age: new FormControl(this.userChar.age, Validators.required),
      level: new FormControl(this.userChar.level, Validators.required),
      gender: new FormControl(this.userChar.gender),
      race: new FormControl(this.userChar.race, Validators.required),
      hair_color: new FormControl(this.userChar.hair_color, Validators.required),
      eyes_color: new FormControl(this.userChar.eyes_color, Validators.required),
      appearance: new FormControl(this.userChar.appearance, Validators.required),
      size: new FormControl(this.userChar.size, Validators.required)
    });
  }

  submitCharacter() {
    Object.assign(this.userChar, this.newguyForm.value);
    if (!this.creating) {
      this.es.updateDocument('characters', this.userChar, this.user.uid).then((result) => {
        console.log(result);
        this.openSnackBar('Character updated', 'Ok tamer');
      }, error => {
        this.openSnackBar('Oopsies, we made a doozies', "':'()");
        console.error(error);
      });
    } else {
      this.es.addToIndex('characters', this.userChar, this.user.uid).then((result) => {
        console.log(result);
        this.openSnackBar('Character created', 'Ok tamer');
      }, error => {
        this.openSnackBar('Oopsies, we made a doozies', "':'()");
        console.error(error);
      });
    }
  }

  toggleChange(changeEvent) {
    if (!this.newguyForm.enabled) {
      this.newguyForm.enable();
    } else {
      this.newguyForm.disable();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }
}

