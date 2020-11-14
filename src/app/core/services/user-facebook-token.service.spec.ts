import { TestBed } from '@angular/core/testing';

import { UserFacebookTokenService } from './user-facebook-token.service';

describe('UserFacebookTokenService', () => {
  let service: UserFacebookTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFacebookTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
