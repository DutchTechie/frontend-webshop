/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/models/user.model';
import * as fromApp from '../app.reducer';
import * as AuthenticationActions from '../auth/store/auth.actions';
import * as ShoppingCartActions from '../shopping-cart/store/shopping-cart.actions';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
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

    if (this.user !== null) {
      this.store.dispatch(new ShoppingCartActions.FetchShoppingCart(+this.user.userId))
    }

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
    this.store.dispatch(new ShoppingCartActions.ClearCart())
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
      this.userSub.unsubscribe();
    }
  }
}

//=============================================================================
