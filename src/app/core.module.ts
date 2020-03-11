import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from 'src/services/product.service';
import {AuthenticationInterceptorService} from '../services/auth-interceptor.service'

@NgModule({
  providers: [
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
