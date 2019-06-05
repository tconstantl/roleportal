import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SecondaryStat} from '../../shared/models/character';
import {BaseStatsDialogComponent} from '../base-stats-dialog/base-stats-dialog.component';

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.scss']
})
export class SkillDialogComponent implements OnInit {

  skillForm: FormGroup;
  statGroups;

  constructor(public dialogRef: MatDialogRef<BaseStatsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: SecondaryStat, private fb: FormBuilder) {
    const physical = [
      {value: 'agility'},
      {value: 'strength'},
      {value: 'constitution'},
      {value: 'dexterity'}
    ];

    const intellectual = [
      {value: 'intelligence'},
      {value: 'will'},
      {value: 'power'},
      {value: 'perception'}
    ];

    this.statGroups = [
      {label: 'Physical', stats: physical},
      {label: 'Intellectual', stats: intellectual}
    ];
  }

  ngOnInit() {
    this.skillForm = this.fb.group({
      name: new FormControl(this.data.name, Validators.required),
      base: new FormControl(this.data.base, Validators.required),
      special: new FormControl(this.data.special, Validators.required),
      class: new FormControl(this.data.class, Validators.required),
      upgradeCost: new FormControl(this.data.upgradeCost, Validators.required),
      modMultiplier: new FormControl(this.data.modMultiplier, Validators.required),
      baseStatMod: new FormControl(this.data.baseStatMod, Validators.required),
      category: new FormControl({value: this.data.category, disabled: true})
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick() {
    this.dialogRef.close(this.skillForm.value);
  }

}
