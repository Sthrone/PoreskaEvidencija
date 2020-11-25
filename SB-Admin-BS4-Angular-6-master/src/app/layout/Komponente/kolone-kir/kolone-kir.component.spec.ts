import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoloneKirComponent } from './kolone-kir.component';

describe('KoloneKirComponent', () => {
  let component: KoloneKirComponent;
  let fixture: ComponentFixture<KoloneKirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoloneKirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoloneKirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
