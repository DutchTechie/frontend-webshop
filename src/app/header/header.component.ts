import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from 'src/models/user.model';
import * as fromApp from '../app.reducer';
import * as AuthenticationActions from '../../reducers/authentication.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription = null;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  user: User = null;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('authentication')
      .pipe(map(authState => {
        return authState.user;
      }))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        this.isAdmin = (user != null)? user.isAdmin : false;
        this.user = user;
      });
  }

  onLogout() {
    this.store.dispatch(new AuthenticationActions.Logout());
  }

  onClickAccount() {
    // this.authService.handleOnAccountLinkClicked()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
