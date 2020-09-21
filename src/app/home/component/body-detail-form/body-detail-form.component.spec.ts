import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyDetailFormComponent } from './body-detail-form.component';

describe('BodyDetailFormComponent', () => {
  let component: BodyDetailFormComponent;
  let fixture: ComponentFixture<BodyDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
