import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniDobavljacaComponent } from './izmeni-dobavljaca.component';

describe('IzmeniDobavljacaComponent', () => {
  let component: IzmeniDobavljacaComponent;
  let fixture: ComponentFixture<IzmeniDobavljacaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzmeniDobavljacaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniDobavljacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
