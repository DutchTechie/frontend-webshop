/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationInterceptorService } from './auth-interceptor.service';

describe('Service: AuthInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationInterceptorService]
    });
  });

  it('should ...', inject([AuthenticationInterceptorService],
    (service: AuthenticationInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
