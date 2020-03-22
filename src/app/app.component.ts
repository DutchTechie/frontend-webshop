/********************************************************
Main app component that checks whether or night a user is
allready logged in.

@author
*********************************************************/

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './app.reducer'
import * as AuthActions from './auth/store/auth.actions';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { User } from 'src/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

//=======================================================

export class AppComponent {
  user$: Observable<User> = null;
  user: User = null;

  constructor(private store: Store<fromApp.AppState>,
    private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.user$ = this.authenticationService.getApplicationUser();
    this.user$.subscribe(user => {
      this.user = user;
    });
  }
}

//=======================================================
