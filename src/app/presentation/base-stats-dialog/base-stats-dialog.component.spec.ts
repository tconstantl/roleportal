import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseStatsDialogComponent } from './base-stats-dialog.component';

describe('BaseStatsDialogComponent', () => {
  let component: BaseStatsDialogComponent;
  let fixture: ComponentFixture<BaseStatsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseStatsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseStatsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
