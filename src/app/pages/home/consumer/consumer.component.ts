import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private shoppingCartService: ShoppingCartService, 
    private router: Router
  ) { }

  ngOnInit(): void {}

  addToCart(productId) {
    if (this.user === null) {
      this.redirectUserToLoginPage(); // TODO: Implement error message when home
    } else {
      let id = this.user.userId;
      this.shoppingCartService.addToCart(id, productId)
      .subscribe(data => console.log(data));
    }
  }

  redirectUserToLoginPage() {
    this.router.navigate(['/login']);
  }

  userIsConsumer(user: User) {
    if (user === null) {
      return true;
    }
    return (user.isAdmin === false);
  }
}
