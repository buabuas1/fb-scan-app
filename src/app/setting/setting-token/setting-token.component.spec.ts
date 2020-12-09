import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingTokenComponent } from './setting-token.component';

describe('SettingTokenComponent', () => {
  let component: SettingTokenComponent;
  let fixture: ComponentFixture<SettingTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
