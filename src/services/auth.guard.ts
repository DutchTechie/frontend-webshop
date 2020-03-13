/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Injectable } from '@angular/core';
import * as fromApp from '../app/app.reducer';
import * as fromAuth from '../reducers/authentication.reducer';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { take, map, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

//=============================================================================

@Injectable()
export class AuthGuard {

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select('authentication')
      .pipe(take(1),
        map((authState: fromAuth.State) => {
          console.log("CAN ACTIVATE: " + authState.user)
          return authState.user;
        }),
        map(user => {
          const currentPath: string = route.routeConfig.path;
          switch (currentPath) {
            case 'account':
              if (user === null) {
                return true;
              }
              this.router.navigate(['']);
              return false;

            case 'product/:mode':
            case 'product/:mode/:id':
              const mode: string = route.paramMap.get("mode");
              if (mode != 'details') {
                if (user !== null) {
                  return user.isAdmin
                }
                this.router.navigate(['']);
                return false;
              }
              return true;

            default:
              console.log([currentPath])
              return true;
          }
        })
      );
  }
}

//=============================================================================
