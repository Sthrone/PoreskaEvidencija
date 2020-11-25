import { TestBed, inject } from '@angular/core/testing';

import { PoreskaPrijavaService } from './poreska-prijava.service';

describe('PoreskaPrijavaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoreskaPrijavaService]
    });
  });

  it('should be created', inject([PoreskaPrijavaService], (service: PoreskaPrijavaService) => {
    expect(service).toBeTruthy();
  }));
});
