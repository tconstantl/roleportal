import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BaseStatsDialogComponent} from '../base-stats-dialog/base-stats-dialog.component';
import {Weapon} from '../../shared/models/character';

@Component({
  selector: 'app-weapon-dialog',
  templateUrl: './weapon-dialog.component.html',
  styleUrls: ['./weapon-dialog.component.scss']
})
export class WeaponDialogComponent implements OnInit {

  weaponForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<BaseStatsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Weapon, private fb: FormBuilder) { }

  ngOnInit() {

    this.weaponForm = this.fb.group({
      name: new FormControl(this.data.name, Validators.required),
      attack: new FormControl(this.data.attack, Validators.required),
      speed: new FormControl(this.data.speed, Validators.required),
      block: new FormControl(this.data.block, Validators.required)
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick() {
    this.dialogRef.close(this.weaponForm.value);
  }


}
