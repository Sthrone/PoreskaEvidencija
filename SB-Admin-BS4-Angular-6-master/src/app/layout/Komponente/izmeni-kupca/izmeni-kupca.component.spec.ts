import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniKupcaComponent } from './izmeni-kupca.component';

describe('IzmeniKupcaComponent', () => {
  let component: IzmeniKupcaComponent;
  let fixture: ComponentFixture<IzmeniKupcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzmeniKupcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniKupcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
