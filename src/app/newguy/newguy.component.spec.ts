import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewguyComponent } from './newguy.component';

describe('NewguyComponent', () => {
  let component: NewguyComponent;
  let fixture: ComponentFixture<NewguyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewguyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewguyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
