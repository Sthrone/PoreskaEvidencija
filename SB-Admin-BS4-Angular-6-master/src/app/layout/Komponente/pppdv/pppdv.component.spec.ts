import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PppdvComponent } from './pppdv.component';

describe('PppdvComponent', () => {
  let component: PppdvComponent;
  let fixture: ComponentFixture<PppdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PppdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PppdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
