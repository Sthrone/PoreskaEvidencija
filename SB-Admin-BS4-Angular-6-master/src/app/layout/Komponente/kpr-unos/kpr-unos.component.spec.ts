import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KprUnosComponent } from './kpr-unos.component';

describe('KprUnosComponent', () => {
  let component: KprUnosComponent;
  let fixture: ComponentFixture<KprUnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KprUnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KprUnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
