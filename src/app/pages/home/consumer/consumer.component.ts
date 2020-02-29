import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/user.model';
import { Product } from 'src/models/product.model';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})

export class ConsumerComponent implements OnInit {
  @Input() products: Product[];
  @Input() user: User;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(productId) {
    let id = this.user.userId;
    this.shoppingCartService.addToCart(id, productId)
    .subscribe(data => console.log(data));
  }

  userIsConsumer(user: User) {
    if (user === null) {
      return true;
    }
    return (user.isAdmin === false);
  }
}
