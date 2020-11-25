import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragaRacunaComponent } from './pretraga-racuna.component';

describe('PretragaRacunaComponent', () => {
  let component: PretragaRacunaComponent;
  let fixture: ComponentFixture<PretragaRacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretragaRacunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragaRacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
