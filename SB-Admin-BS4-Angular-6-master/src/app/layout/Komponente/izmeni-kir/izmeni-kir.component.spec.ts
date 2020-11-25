import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniKirComponent } from './izmeni-kir.component';

describe('IzmeniKirComponent', () => {
  let component: IzmeniKirComponent;
  let fixture: ComponentFixture<IzmeniKirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzmeniKirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniKirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
