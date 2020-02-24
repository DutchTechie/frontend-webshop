import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
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

  constructor() {
    this.updateTotalPrice('')
  }

  ngOnInit(): void {
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
