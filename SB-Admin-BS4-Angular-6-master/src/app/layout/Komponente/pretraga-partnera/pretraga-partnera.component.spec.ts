import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragaPartneraComponent } from './pretraga-partnera.component';

describe('PretragaPartneraComponent', () => {
  let component: PretragaPartneraComponent;
  let fixture: ComponentFixture<PretragaPartneraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretragaPartneraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragaPartneraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
