/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/models/user.model';
import * as fromApp from '../app.reducer';
import * as AuthenticationActions from '../../reducers/authentication.actions';
import { AuthenticationService } from 'src/services/authentication.service';

//=============================================================================

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  user: User = null;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.authenticationService.getApplicationUser().subscribe(user => {
      this.user = user;
    })
  }

  onLogout() {
    this.store.dispatch(new AuthenticationActions.Logout());
  }

  userIsConsumer() {
    return this.authenticationService.userIsConsumer(this.user);
  }

  onClickAccount() {
    // this.authService.handleOnAccountLinkClicked()
  }
}

//=============================================================================
