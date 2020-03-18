/********************************************************
@author
*********************************************************/

//=======================================================

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app/app.reducer'
import { User } from 'src/models/user.model';
import { map } from 'rxjs/operators';
import { of, Subscription, Observable } from 'rxjs';

//=======================================================

@Injectable({
  providedIn: 'root'
})

//=======================================================

export class AuthenticationService {

  constructor(private store: Store<fromApp.AppState>) { }

  getApplicationUser(): Observable<User> {
    console.log("User is getting fetched")
    return this.store.select('authentication').pipe(map(authenticationState => {
      return authenticationState.user
    }));
  }

  userIsConsumer(user: User): boolean {
    if (user !== null) {
      return (user.isAdmin === false);
    }
    return true;
  }

  userIsAdmin(user: User): boolean {
    return (user !== null) ? user.isAdmin : false;
  }
}

//=======================================================
