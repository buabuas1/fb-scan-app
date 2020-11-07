import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetGroupMemberComponent } from './get-group-member.component';

describe('GetGroupMemberComponent', () => {
  let component: GetGroupMemberComponent;
  let fixture: ComponentFixture<GetGroupMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetGroupMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetGroupMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
