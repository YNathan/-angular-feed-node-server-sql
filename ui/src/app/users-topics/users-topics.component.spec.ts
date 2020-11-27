import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTopicsComponent } from './users-topics.component';

describe('UsersTopicsComponent', () => {
  let component: UsersTopicsComponent;
  let fixture: ComponentFixture<UsersTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
