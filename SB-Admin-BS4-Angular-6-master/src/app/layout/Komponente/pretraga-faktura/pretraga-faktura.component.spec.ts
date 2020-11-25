import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragaFakturaComponent } from './pretraga-faktura.component';

describe('PretragaFakturaComponent', () => {
  let component: PretragaFakturaComponent;
  let fixture: ComponentFixture<PretragaFakturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretragaFakturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragaFakturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
