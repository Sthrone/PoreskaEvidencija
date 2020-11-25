import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajKupcaComponent } from './dodaj-kupca.component';

describe('DodajKupcaComponent', () => {
  let component: DodajKupcaComponent;
  let fixture: ComponentFixture<DodajKupcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajKupcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajKupcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
