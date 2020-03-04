/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthorizationGuardService } from './authorization-guard.service';

describe('Service: AuthorizationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationGuardService]
    });
  });

  it('should ...', inject([AuthorizationGuardService], (service: AuthorizationGuardService) => {
    expect(service).toBeTruthy();
  }));
});
