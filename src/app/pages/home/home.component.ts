import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  private userSubscription : Subscription;
  user: User = null;
  products: Product[] = [];
  pageToRedirectUserTo : string;

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.fetchAllProducts().subscribe(allProducts => {
      this.products = allProducts;
      this.products.map((product) => ( product.state = 'normal' ))
      // this.products.map((product) => (console.log(product)));

      // for (let i = 0; allProducts.length; i++) {
      //   allProducts[i].state = 'normal';
      //   this.products.push(allProducts[i]);
      // }
    })
    this.user = this.getLoggedInUser();
    if (this.userIsLoggedIn(this.user)) {
      console.log("The user is logged in.");
    } else {
      console.log("The user is NOT logged in.");
    }
  }

  userIsConsumer(user: User) {
    // App cannot check if user is admin or not if null.
    // So, check for that first.
    if (user === null) {
      return true;
    }
    return (user.isAdmin === false);
  }

  private getLoggedInUser(): User {
    let userToAsssignValueTo : User = null;
    this.userSubscription = this.authenticationService.user.subscribe(user => {
      userToAsssignValueTo = user;
    })
    return userToAsssignValueTo;
  }

  private userIsLoggedIn(user: User) : boolean {
    return (user !== null);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  redirectUser(pageToRedirectUserTo) {
    this.router.navigate([pageToRedirectUserTo]);
  }
}
