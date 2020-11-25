import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KirPregledComponent } from './kir-pregled.component';

describe('KirPregledComponent', () => {
  let component: KirPregledComponent;
  let fixture: ComponentFixture<KirPregledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KirPregledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KirPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
