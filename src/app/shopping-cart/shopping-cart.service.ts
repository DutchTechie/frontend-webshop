import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cart } from './cart.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart = new BehaviorSubject<Cart>(null) // TODO: why use this type?
  private SHOPPING_CART_PATH_URI: string = "http://localhost:8080/shoppingCart"

  constructor(private http: HttpClient, private router: Router) {}

  public addToCart(userId: string, productId: string) {
    let cart = new Cart(userId, productId, 1);
    return this.http.post<Cart>(this.SHOPPING_CART_PATH_URI, cart)
      .pipe(map(cart => {
        console.log(cart)
        return cart;
      }))
  }

  public fetchShoppingCart(userId: String) {
    return this.http.get(`${this.SHOPPING_CART_PATH_URI}/${userId}`)
    .pipe(map(shoppingCart => 
      {
        return shoppingCart;
      }));
  }

}
