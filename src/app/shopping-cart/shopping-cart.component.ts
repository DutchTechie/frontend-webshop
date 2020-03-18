/*****************************************************************************
Represents a form for either creating a new product or
editing an existing one.

@author
******************************************************************************/

//=============================================================================

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import * as ShoppingCartActions from '../../reducers/shopping-cart.actions';
import { slideOutAnimation } from '../shared/animations/fade-out.animation';
import { changeState } from '../shared/animations/change-state.animation';
import { animateOut } from '../shared/animations/animate-out.animation';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'src/models/shopping-cart.model';
import { Observable, of } from 'rxjs';
import { Cart } from 'src/models/cart.model';
import { AuthenticationService } from 'src/services/authentication.service';
import { User } from 'src/models/user.model';

import * as fromShoppingCart from '../../reducers/shopping-cart.reducer';

//=============================================================================

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [slideOutAnimation, changeState, animateOut]
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartState: Observable<fromShoppingCart.State>;
  hideAllProductsPriorToDeletingThem: boolean = false;
  calledEndAnimationOnce: boolean = false;
  slideOut: string = 'normal';
  shoppingCartItem: ShoppingCart = null;
  shoppingCartItemSubs: Observable<ShoppingCart[]>
  totalPrice : number = 0;
  user: User = null;

  constructor(
    private authenticationService : AuthenticationService,
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit(): void {
    this.initializeApplicationUser();
    this.shoppingCartState = this.store.select('shoppingCart');
  }

  initializeApplicationUser() {
    this.authenticationService.getApplicationUser().subscribe((appUser) => { this.user = appUser;});
  }

  fetchShoppingCart() {
    this.totalPrice = 0;
    this.store.dispatch(new ShoppingCartActions.FetchShoppingCart(+this.user.userId));
  }

  fetchAllProducts() {
    this.hideAllProductsPriorToDeletingThem = false;
  }

  endOfDeleteAllAnimation() {
    if (this.calledEndAnimationOnce == true) {
      this.hideAllProductsPriorToDeletingThem = true;
      this.calledEndAnimationOnce = false;
      this.deleteAllShoppingCartItems();
    }
  }

  startDeletingAllItemsFromShoppingCart() {
    if (this.consumerIsSureToDelete()) {
      this.calledEndAnimationOnce = true;
      this.slideOut = 'slideOut';
    }
  }

  onEndDeleteShoppingCartItemAnimation() {
    if (this.shoppingCartItem !== null) {
      this.shoppingCartItem.visible = false;
      this.deleteShoppingCartItem(+this.user.userId, +this.shoppingCartItem.products.id);
      this.shoppingCartItem = null;
    }
  }

  startDeletingShoppingCartItem(cartItem: ShoppingCart) {
    if (this.consumerIsSureToDelete()) {
      if (cartItem.state === 'normal') {
        cartItem.state = 'slideOut';
      }
      else {
        cartItem.state = 'normal';
      }
      this.shoppingCartItem = cartItem;
    }
  }

  deleteShoppingCartItem(userId: number, productId: number) {
    this.store.dispatch(new ShoppingCartActions.DeleteCartItem({
      userId: userId,
      productId: productId
    }));
  }

  deleteAllShoppingCartItems() {
    this.store.dispatch(new ShoppingCartActions.DeleteAllCartItems(+this.user.userId));
  }

  private consumerIsSureToDelete(): boolean {
    return confirm('Are you sure?');
  }

  updateCart(cart: Cart) {
    this.store.dispatch(new ShoppingCartActions.UpdateCart(cart));
  }

  updateTotalPrice(event) {
    this.totalPrice = 0
    this.shoppingCartState.subscribe((state) => {
      state.shoppingCart.forEach(cart => {
        if (event.srcElement != null) {
          if (event.srcElement.name == cart.products.name) {
            cart.carts.amount = event.target.value;
            this.updateCart(cart.carts)
          }
        }
        // this.totalPrice += cart.carts.amount * cart.products.price
      });
    });
  }
}

//=============================================================================
