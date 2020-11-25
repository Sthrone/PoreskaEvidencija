import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KirUnosComponent } from './kir-unos.component';

describe('KirUnosComponent', () => {
  let component: KirUnosComponent;
  let fixture: ComponentFixture<KirUnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KirUnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KirUnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
