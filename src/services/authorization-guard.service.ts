import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthenticationService } from './authentication.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app/app.reducer';
import { take, map } from 'rxjs/operators';

// TODO: Add auth service

// TODO: Use the product service as an example and update this service.

@Injectable({  providedIn: 'root' })
export class AuthorizationGuardService implements CanActivate {
  private userSubscription: Subscription;
  user: User = null

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>
  ) { }


  canActivate(route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.select('authentication').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    )
  }


  /*
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const mode: string = route.paramMap.get("mode");

    const path: string = route.routeConfig.path;
    console.log(path)

    // Check if the user is logged in first
    // Users who are not logged in have less privalige than the rest

    this.user = this.getLoggedInUser();

    // TODO: consider using a swithc statement

    if (this.userIsAdmin(this.user) === false) {
      if (mode != null) {
        if (mode === "mutate") {
          console.log("Not authenticated");
          this.router.navigate(['/']);
          return false;
        }
      }
    } else {  // User is admin
      if (path === "cart") {
        this.router.navigate(['/']);
        return false;
      }
    }

    if (mode != null) {
      if (mode !== "details") {
        if (mode !== "mutate") {
          this.router.navigate(['/not-found']);
          return false;
        }
      }
    }

    if (path === 'login' || path === "signup") {
      if (this.user !== null) {
        this.router.navigate(['/']);
        return false;
      }
    }

    return true;
  }*/

  private getLoggedInUser(): User {
    let userToAsssignValueTo: User = null;

    // return this.store.select('authentication').pipe(
    //   take(1),
    //   map(authState => {
    //     return authState.user;
    //   }),
    // )

    // this.userSubscription = this.authenticationService.user.subscribe(user => {
    //   userToAsssignValueTo = user;
    // });
    return userToAsssignValueTo;
  }

  private userIsAdmin(user: User): boolean {
    if (user === null) {
      return false;
    }
    return (user.isAdmin === true);
  }
}
