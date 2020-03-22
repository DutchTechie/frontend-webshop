/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import * as fromApp from '../../app/app.reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { take, map, exhaustMap } from 'rxjs/operators';

//=============================================================================

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('authentication').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedRequest = request;
        /*const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', 'replaceThis') // TODO: Include this rule in cors
        });*/
        return next.handle(modifiedRequest);
      })
    )
  }
}

//=============================================================================
