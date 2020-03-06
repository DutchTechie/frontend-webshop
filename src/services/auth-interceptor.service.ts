import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    // The cors configuration the serve has won't allow the headers in any request this right now!
    const modifiedRequest = request.clone({
      // headers: request.headers.append('auth', 'hello')
    });
    return next.handle(modifiedRequest);
  }
}
