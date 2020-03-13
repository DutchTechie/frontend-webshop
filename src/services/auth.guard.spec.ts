/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Auth } from './auth.guard';

describe('Service: Auth.guard.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth]
    });
  });

  it('should ...', inject([Auth], (service: Auth) => {
    expect(service).toBeTruthy();
  }));
});
