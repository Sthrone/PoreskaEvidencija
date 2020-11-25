import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopdvComponent } from './popdv.component';

describe('PopdvComponent', () => {
  let component: PopdvComponent;
  let fixture: ComponentFixture<PopdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
