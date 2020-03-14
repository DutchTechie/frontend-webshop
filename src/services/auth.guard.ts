/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Injectable } from '@angular/core';
import * as fromApp from '../app/app.reducer';
import * as fromAuth from '../reducers/authentication.reducer';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as PRODUCT_ROUTES from '../app/product/product.routes';
import * as AUTH_ROUTES from '../app/authentication/auth.routes';
import * as SHOPPING_CART_ROUTES from '../app/shopping-cart/shopping-cart.routes';

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
          return authState.user;
        }),
        map(user => {
          const currentPath: string = route.routeConfig.path;
          switch (currentPath) {
            case AUTH_ROUTES.ABSOLUTE_PATH_DEFAULT:
            case AUTH_ROUTES.ABSOLUTE_PATH_LOGIN:
            case AUTH_ROUTES.ABSOLUTE_PATH_SIGNUP:
              if (user === null) {
                return true;
              }
              this.router.navigate([PRODUCT_ROUTES.ABSOLUTE_PATH_DEFAULT]);
              return false;

            case PRODUCT_ROUTES.ABSOLUTE_PATH_CREATE_PRODUCT:
            case PRODUCT_ROUTES.ABSOLUTE_PATH_MUTATE_OR_DETAILS:
              const mode: string = route.paramMap.get("mode");
              if (mode != 'details') {
                if (user !== null) {
                  return user.isAdmin
                }
                this.router.navigate([PRODUCT_ROUTES.ABSOLUTE_PATH_DEFAULT]);
                return false;
              }
              return true;

            case SHOPPING_CART_ROUTES.SHOPPING_CART_PATH:
              if (user !== null) {
                if (user.isAdmin == false) {
                  return true;
                }
                this.router.navigate([PRODUCT_ROUTES.ABSOLUTE_PATH_DEFAULT]);
                return false;
              }
              this.router.navigate([PRODUCT_ROUTES.ABSOLUTE_PATH_DEFAULT]);
              return false;

            default:
              console.log(currentPath)
              return true;
          }
        })
      );
  }
}

//=============================================================================
