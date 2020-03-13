/********************************************************
Represents details of a particular product. When a
consumer visits this page, he/she may add a product to
the sopping cart. If an administrator visits the page, the
view will switch to amin mode and provide the option to
edit the product.

@author
*********************************************************/

//=======================================================

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/models/product.model';
import { AuthenticationService } from 'src/services/authentication.service';
import { User } from 'src/models/user.model';

//=======================================================

@Component({
  selector: 'app-product-details',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

//=======================================================

export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  @Output() switchToEditMode = new EventEmitter();
  user: User = null;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.initializeUser();
  }

  initializeUser() {
    this.authenticationService.getApplicationUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnChanges() {}

  handleButtonClick() {
    if (this.userIsAdmin()) {
      this.switchToEditMode.emit();
    } else {
      this.addToCart(+this.product.id);
    }
  }

  userIsAdmin() {
    return this.authenticationService.userIsAdmin(this.user);
  }

  addToCart(productId: number) {
    console.log(productId)
    // TODO: Create a service for adding product id to cart.
  }
}

//=======================================================
