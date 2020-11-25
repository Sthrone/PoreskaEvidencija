import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoloneKprComponent } from './kolone-kpr.component';

describe('KoloneKprComponent', () => {
  let component: KoloneKprComponent;
  let fixture: ComponentFixture<KoloneKprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoloneKprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoloneKprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
