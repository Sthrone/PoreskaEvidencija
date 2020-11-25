import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajDobavljacaComponent } from './dodaj-dobavljaca.component';

describe('DodajDobavljacaComponent', () => {
  let component: DodajDobavljacaComponent;
  let fixture: ComponentFixture<DodajDobavljacaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajDobavljacaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajDobavljacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
