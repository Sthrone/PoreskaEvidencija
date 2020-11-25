import { TestBed, inject } from '@angular/core/testing';

import { PartnerInfoService } from './partner-info.service';

describe('PartnerInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnerInfoService]
    });
  });

  it('should be created', inject([PartnerInfoService], (service: PartnerInfoService) => {
    expect(service).toBeTruthy();
  }));
});
