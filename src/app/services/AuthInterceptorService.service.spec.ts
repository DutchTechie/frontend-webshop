/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthInterceptorServiceService } from './AuthInterceptorService.service';

describe('Service: AuthInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptorServiceService]
    });
  });

  it('should ...', inject([AuthInterceptorServiceService], (service: AuthInterceptorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
