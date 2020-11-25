import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KprPregledComponent } from './kpr-pregled.component';

describe('KprPregledComponent', () => {
  let component: KprPregledComponent;
  let fixture: ComponentFixture<KprPregledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KprPregledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KprPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
