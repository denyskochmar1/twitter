import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowbuttonComponent } from './followbutton.component';

describe('FollowbuttonComponent', () => {
  let component: FollowbuttonComponent;
  let fixture: ComponentFixture<FollowbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
