import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/user.model';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})

export class ConsumerComponent implements OnInit {
  @Input() products: Product[];
  @Input() user: User;
  @Output() pageToRedirectUser = new EventEmitter<string>();

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {}

  addToCart(productId) {
    if (this.user === null || this.user.isAdmin === true) {
      this.redirectUser(); // TODO: Implement error message when home
    } else {
      let id = this.user.userId;
      this.shoppingCartService.addToCart(id, productId)
        .subscribe(data => console.log(data));
    }
  }

  redirectUser() {
    this.pageToRedirectUser.emit('/login');
  }
}
