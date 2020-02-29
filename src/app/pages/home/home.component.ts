import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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