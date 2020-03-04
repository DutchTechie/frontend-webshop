import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthenticationService } from './authentication.service';

// TODO: Add auth service

@Injectable()
export class AuthorizationGuardService implements CanActivate {
  private userSubscription: Subscription;
  user: User = null

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const mode: string = route.paramMap.get("mode");

    const path: string = route.routeConfig.path;
    console.log(path)

    // Check if the user is logged in first
    // Users who are not logged in have less privalige than the rest

    this.user = this.getLoggedInUser();

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
  }

  private getLoggedInUser(): User {
    let userToAsssignValueTo: User = null;
    this.userSubscription = this.authenticationService.user.subscribe(user => {
      userToAsssignValueTo = user;
    });
    return userToAsssignValueTo;
  }

  private userIsAdmin(user: User): boolean {
    if (user === null) {
      return false;
    }
    return (user.isAdmin === true);
  }
}
