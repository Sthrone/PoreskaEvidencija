import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KolonePartneraComponent } from './kolone-partnera.component';

describe('KolonePartneraComponent', () => {
  let component: KolonePartneraComponent;
  let fixture: ComponentFixture<KolonePartneraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KolonePartneraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KolonePartneraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
