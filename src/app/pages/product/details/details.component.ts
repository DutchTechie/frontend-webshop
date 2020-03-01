import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  @Input() product: Product;
  @Input() user: User = null;
  @Output() pageToRedirectUser = new EventEmitter<string>();
  @Output() switchToMode = new EventEmitter<boolean>();

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {}

  handleMainButtonClick() {
    if (this.userIsAdmin(this.user)) {
      this.switchToMode.emit(true);
    } else {
      this.addToCart(this.product.id);
    }
  }

  userIsAdmin(user: User): boolean {
    if (user === null) {
      return false;
    }
    return (user.isAdmin === true);
  }

  addToCart(productId) {
    if(this.user != null) {
      if (this.user.isAdmin === false) {
        let id = this.user.userId;
        this.shoppingCartService.addToCart(id, productId)
          .subscribe(data => console.log(data));
      } else {
        this.redirectUser('/'); // TODO: Implement error message when home
      }
    } else {
      this.redirectUser('/login');
    }
  }

  redirectUser(page) {
    this.router.navigate([page]);
  }
}