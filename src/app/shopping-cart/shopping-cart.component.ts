import { Component, OnInit, Input } from '@angular/core';
import { Cart } from './cart.model';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { ShoppingCartService } from './shopping-cart.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  carts: Cart[] = [];
  totalPrice
  private userSub : Subscription;
  user: User = null

  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService, ) {
    this.updateTotalPrice('');
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
    // this.carts.forEach(cart => {
    //   this.totalPrice += cart.amount*cart.product.price
    // });
  }

  fetchShoppingCart() {
    this.shoppingCartService.fetchShoppingCart(this.user.userId).subscribe(data => {
      console.log(data);
    });
  }

  updateTotalPrice(event) {
    this.totalPrice = 0
    this.carts.forEach(cart => {
      if (event.srcElement != null) {
        // if (event.srcElement.name == cart.product.name) {
        //   cart.amount = event.target.value
        //   console.log(event.srcElement.name)
        // } 
      }
      // this.totalPrice += cart.amount*cart.product.price
    });
  }

}
