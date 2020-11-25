import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniKprComponent } from './izmeni-kpr.component';

describe('IzmeniKprComponent', () => {
  let component: IzmeniKprComponent;
  let fixture: ComponentFixture<IzmeniKprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzmeniKprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniKprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
