import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BaseStat} from '../../shared/models/character';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-base-stats-dialog',
  templateUrl: './base-stats-dialog.component.html',
  styleUrls: ['./base-stats-dialog.component.scss']
})
export class BaseStatsDialogComponent implements OnInit {

  baseStatsForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<BaseStatsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: BaseStat[], private fb: FormBuilder) { }

  ngOnInit() {
    this.baseStatsForm = this.fb.group({
      agility: new FormControl(this.data.find(x => x.id === 'agility').base, [Validators.required, Validators.max(20), Validators.min(1)]),
      strength: new FormControl(this.data.find(x => x.id === 'strength').base, [Validators.required, Validators.max(20), Validators.min(1)]),
      dexterity: new FormControl(this.data.find(x => x.id === 'dexterity').base, [Validators.required, Validators.max(20), Validators.min(1)]),
      constitution: new FormControl(this.data.find(x => x.id === 'constitution').base, [Validators.required, Validators.max(20), Validators.min(1)]),
      intelligence: new FormControl(this.data.find(x => x.id === 'intelligence').base, [Validators.required, Validators.max(20), Validators.min(1)]),
      will: new FormControl(this.data.find(x => x.id === 'will').base, [Validators.required, Validators.max(20), Validators.min(1)]),
      power: new FormControl(this.data.find(x => x.id === 'power').base, [Validators.required, Validators.max(20), Validators.min(1)]),
      perception: new FormControl(this.data.find(x => x.id === 'perception').base, [Validators.required, Validators.max(20), Validators.min(1)])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    let newStats = this.data;
    newStats.find(x => x.id === 'agility').base = this.baseStatsForm.value.agility;
    newStats.find(x => x.id === 'strength').base = this.baseStatsForm.value.strength;
    newStats.find(x => x.id === 'dexterity').base = this.baseStatsForm.value.dexterity;
    newStats.find(x => x.id === 'constitution').base = this.baseStatsForm.value.constitution;
    newStats.find(x => x.id === 'intelligence').base = this.baseStatsForm.value.intelligence;
    newStats.find(x => x.id === 'perception').base = this.baseStatsForm.value.perception;
    newStats.find(x => x.id === 'will').base = this.baseStatsForm.value.will;
    newStats.find(x => x.id === 'power').base = this.baseStatsForm.value.power;
    this.dialogRef.close(newStats);
  }

}
