import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledDobavljacaComponent } from './pregled-dobavljaca.component';

describe('PregledDobavljacaComponent', () => {
  let component: PregledDobavljacaComponent;
  let fixture: ComponentFixture<PregledDobavljacaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregledDobavljacaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledDobavljacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
