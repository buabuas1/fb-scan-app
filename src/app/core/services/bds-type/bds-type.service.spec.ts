import { TestBed } from '@angular/core/testing';

import { BdsTypeService } from './bds-type.service';

describe('BdsTypeService', () => {
  let service: BdsTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdsTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
