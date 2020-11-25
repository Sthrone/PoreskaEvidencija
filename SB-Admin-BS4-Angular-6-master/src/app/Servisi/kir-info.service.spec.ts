import { TestBed, inject } from '@angular/core/testing';

import { KirInfoService } from './kir-info.service';

describe('KirInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KirInfoService]
    });
  });

  it('should be created', inject([KirInfoService], (service: KirInfoService) => {
    expect(service).toBeTruthy();
  }));
});
