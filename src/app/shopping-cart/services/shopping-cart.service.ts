import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { take, map, mergeMap, tap, first } from 'rxjs/operators';
import * as fromShoppingCart from '../store/shopping-cart.effects';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private store: Store<fromApp.AppState>) { }

  countShoppingCarts() {
    const observable = this.store.select('shoppingCart');
    observable.subscribe((shoppingCartState) => {
      let count = 0;
      shoppingCartState.shoppingCart.forEach((cart) => {
        count += cart.carts.amount;
      })
      console.log(count);
    })
  }
}
