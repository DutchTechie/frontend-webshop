import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private userSub : Subscription;
  user: User = null
  carts = [{
    amount: 3,
    product: {
      name: "shoe",
      imagePath: "www.path.com",
      price: 150
    }
  },
  {
    amount: 4,
    product: {
      name: "shoesss",
      imagePath: "www.path.com",
      price: 200
    }
  }]
  totalPrice : number = 0
  
  // TODO: Create a user's info model
  userInfo = {
    name: null,
    address: null,
    zipCode: null,
    country: null,
    phone: null,
  }

  constructor(private authService: AuthService) { 
    this.updateTotalPrice('')
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      if (user == null) {
        this.user = new User("", "", false)
        return
      }
      this.user = user
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  updateSubTotal() {
    this.totalPrice = 0
    this.carts.forEach(cart => {
      this.totalPrice += cart.amount*cart.product.price
    });
  }

  updateTotalPrice(event) {
    this.totalPrice = 0
    this.carts.forEach(cart => {
      if (event.srcElement != null) {
        if (event.srcElement.name == cart.product.name) {
          cart.amount = event.target.value
          console.log(event.srcElement.name)
        } 
      }
      this.totalPrice += cart.amount*cart.product.price
    });
  }
}
