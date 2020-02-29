import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../../../models/cart.model';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartData
  private userSub : Subscription;
  user: User = null;
  totalPrice : number = 0;

  cartToUpdate: Cart = null;

  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthenticationService) {
    this.userSub = this.authService.user.subscribe(user => {
      if (user == null) {
        this.user = new User("", "", false)
        return
      }
      this.user = user
    });
    this.fetchShoppingCart();
  }

  ngOnInit(): void {
    
  }

  updateSubTotal() {
    this.totalPrice = 0
    this.shoppingCartData.forEach(cart => {
      this.totalPrice += cart.carts.amount * cart.products.price
    });
  }

  fetchShoppingCart() {
    this.shoppingCartService.fetchShoppingCart(this.user.userId).subscribe(data => {
      this.shoppingCartData = data;
      this.updateSubTotal();
      console.log(this.shoppingCartData)
    });
  }

  updateTotalPrice(event) {
    this.totalPrice = 0
    this.shoppingCartData.forEach(cart => {
      if (event.srcElement != null) {
        if (event.srcElement.name == cart.products.name) {
          cart.carts.amount = event.target.value
          this.updateCart(cart.carts)
          // console.log(event.srcElement.name)
        } 
      }
      this.totalPrice += cart.carts.amount * cart.products.price
    });
  }

  updateCart(cart: Cart) {
    this.shoppingCartService.updateCart(cart).subscribe(data => {
      console.log(data);
    })
  }

  deleteCart(cart: Cart) {
    this.shoppingCartService.removeCart(cart).subscribe(data =>{
      console.log(data);
    })
    this.fetchShoppingCart();
  }
}