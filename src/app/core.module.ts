import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './miscellaneous/logging.interceptor';

import { ProductService } from 'src/services/product.service';
import { AuthenticationInterceptorService } from 'src/services/auth-interceptor.service';

@NgModule({
  providers: [
    ProductService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true},  // change back to true
    // {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class CoreModule {}
