import { TestBed, inject } from '@angular/core/testing';

import { KprInfoService } from './kpr-info.service';

describe('KprInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KprInfoService]
    });
  });

  it('should be created', inject([KprInfoService], (service: KprInfoService) => {
    expect(service).toBeTruthy();
  }));
});
