/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/models/user.model';
import * as fromApp from '../app.reducer';
import * as AuthenticationActions from '../../reducers/authentication.actions';
import * as ShoppingCartActions from '../../reducers/shopping-cart.actions';
import { AuthenticationService } from 'src/services/authentication.service';
import { Observable, of, Subscription } from 'rxjs';

//=============================================================================

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  numberOfCarts: number = 0;
  user: User = null;
  userSub: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.authenticationService.getApplicationUser().subscribe(user => {
      this.user = user;
      if(this.user !== null) {
        if (!this.user.isAdmin) {
          this.updateShoppingCartNumber();
        }
      }
    })

  }

  updateShoppingCartNumber() {
    this.store.select('shoppingCart').subscribe(shoppingCartState => {
      let numberOfCarts: number = 0;
      shoppingCartState.shoppingCart.forEach(item => {
        numberOfCarts += item.carts.amount;
      })
      this.numberOfCarts = numberOfCarts;
    })
  }

  onLogout() {
    this.store.dispatch(new AuthenticationActions.Logout());
    this.numberOfCarts = 0;
  }

  userIsConsumer() {
    return this.authenticationService.userIsConsumer(this.user);
  }

  onClickAccount() {
    // this.authService.handleOnAccountLinkClicked()
  }

  ngOnDestroy() {
    if (this.userSub) {
      console.log("User is being destroyed")
      this.userSub.unsubscribe();
    }
  }
}

//=============================================================================
