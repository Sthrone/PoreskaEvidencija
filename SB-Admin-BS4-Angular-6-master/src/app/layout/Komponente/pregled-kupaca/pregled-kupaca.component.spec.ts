import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledKupacaComponent } from './pregled-kupaca.component';

describe('PregledKupacaComponent', () => {
  let component: PregledKupacaComponent;
  let fixture: ComponentFixture<PregledKupacaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregledKupacaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledKupacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
