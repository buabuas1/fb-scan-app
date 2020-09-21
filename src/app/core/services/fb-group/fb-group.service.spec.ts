import { TestBed } from '@angular/core/testing';

import { FbGroupService } from './fb-group.service';

describe('FbGroupService', () => {
  let service: FbGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
