import { TestBed } from '@angular/core/testing';

import { BdsContentApiService } from './bds-content-api.service';

describe('BdsContentApiService', () => {
  let service: BdsContentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdsContentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
