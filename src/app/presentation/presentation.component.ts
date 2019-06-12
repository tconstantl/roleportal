import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElasticsearchService} from '../shared/services/elasticsearch.service';
import {AuthService} from '../shared/services/auth.service';
import {User} from 'firebase';
import {Character, resetActualStats, SecondaryStat} from '../shared/models/character';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {BaseStatsDialogComponent} from './base-stats-dialog/base-stats-dialog.component';
import {SkillDialogComponent} from './skill-dialog/skill-dialog.component';
import {__assign} from 'tslib';


@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  user: User;
  userChar: Character;
  loadingChar: boolean;
  newguyForm: FormGroup;
  classes = [];
  creating: boolean;
  generalStats; athleticSkills; vigorSkills; perceptionSkills; intellectualSkills; socialSkills; subterfugeSkills; creativeSkills; specialSkills;
  displayedGeneral: string[] = ['id', 'base', 'actual', 'mod'];
  displayedSkills: string[] = ['name', 'base', 'mod', 'spe', 'class', 'total', 'edit', 'del' ];

  showStatsSkills: boolean;


  constructor(private es: ElasticsearchService, private cd: ChangeDetectorRef, private as: AuthService, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, public dialog: MatDialog) {
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
        this.loadStats();
      }, error => {
        this.userChar = new Character();
        this.generateForm();
        console.error(error);
        this.newguyForm.disable();
        this.loadingChar = false;
        this.creating = true;
        this.loadStats();
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

  toggleChange() {
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

  loadStats() {
    this.generalStats = this.userChar.base_stats;
    this.athleticSkills = this.userChar.secondary_stats.filter(x => x.category === 'athletic');
    this.vigorSkills = this.userChar.secondary_stats.filter(x => x.category === 'vigor');
    this.perceptionSkills = this.userChar.secondary_stats.filter(x => x.category === 'perception');
    this.intellectualSkills = this.userChar.secondary_stats.filter(x => x.category === 'intellectual');
    this.socialSkills = this.userChar.secondary_stats.filter(x => x.category === 'social');
    this.subterfugeSkills = this.userChar.secondary_stats.filter(x => x.category === 'subterfuge');
    this.creativeSkills = this.userChar.secondary_stats.filter(x => x.category === 'creative');
    this.specialSkills = this.userChar.secondary_stats.filter(x => x.category === 'special');
  }

  openBaseStatDialog() {
    const dialogRef = this.dialog.open(BaseStatsDialogComponent, {
      data: this.userChar.base_stats
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userChar.base_stats = result;
       resetActualStats(this.userChar);
       const payload = {
         base_stats: this.userChar.base_stats
       };
       this.es.updateDocument('characters', payload, this.user.uid).then((result) => {
         this.snackbar.open('General stats updated', 'Ok', { duration: 2000});
       }, error => {
         this.snackbar.open('Oopsies, we made a doozies', "':'()", { duration: 2000});
         console.error(error);
       });
      } else {
        this.snackbar.open('No changes made', 'Ok', { duration: 2000});
      }
    });
  }

  openSkillDialog(skill: SecondaryStat, category?: string) {
    if (skill) {
      const dialogRef = this.dialog.open(SkillDialogComponent, {
        data: skill
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          Object.assign(skill, result);
          const payload = {
            secondary_stats: this.userChar.secondary_stats
          };
          this.es.updateDocument('characters', payload, this.user.uid).then((result) => {
            this.snackbar.open('Skill updated', 'Ok', { duration: 2000});
          }, error => {
            this.snackbar.open('Oopsies, we made a doozies', "':'()", { duration: 2000});
            console.error(error);
          });
        } else {
          this.snackbar.open('No changes made', 'Ok', { duration: 2000});
        }
      });
    } else {
      let newSkill = new SecondaryStat(category);
      const dialogRef = this.dialog.open(SkillDialogComponent, {
        data: newSkill
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          Object.assign(newSkill, result);
          this.userChar.secondary_stats.push(newSkill);
          this.loadStats();
          const payload = {
            secondary_stats: this.userChar.secondary_stats
          };
          this.es.updateDocument('characters', payload, this.user.uid).then((result) => {
            this.snackbar.open('Skill created', 'Ok', { duration: 2000});
          }, error => {
            this.snackbar.open('Oopsies, we made a doozies', "':'()", { duration: 2000});
            console.error(error);
          });
        } else {
          this.snackbar.open('No changes made', 'Ok', { duration: 2000});
        }
      });
    }
  }

  deleteSkill(skill: SecondaryStat) {
    let index = this.userChar.secondary_stats.indexOf(skill);
    this.userChar.secondary_stats.splice(index, 1);
    const payload = {
      secondary_stats: this.userChar.secondary_stats
    };
    this.es.updateDocument('characters', payload, this.user.uid).then((result) => {
      this.snackbar.open('Skill deleted', 'Ok', { duration: 2000});
    }, error => {
      this.snackbar.open('Oopsies, we made a doozies', "':'()", { duration: 2000});
      console.error(error);
    });
    this.loadStats();
  }

  getStatMod(id: string) {
    return this.userChar.base_stats.find(x => x.id === id).mod;
  }
}

