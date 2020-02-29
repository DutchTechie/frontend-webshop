import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userSubscription : Subscription;
  user: User = null;
  products: Product[] = [];
  
  constructor(
    private authenticationService: AuthenticationService, 
    private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchAllProducts();
    this.user = this.getLoggedInUser();
    if (this.userIsLoggedIn(this.user)) {
      console.log("The user is logged in.");
    } else {
      console.log("The user is NOT logged in.");
    }
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
  
  fetchAllProducts() {
    this.productService.fetchAllProducts().subscribe(data => {
      this.products = data
    })
  }

  deleteAllProducts() {
    let status = confirm('Are you sure?') // dry?
    if (status) {
      console.log("delete all products")
      this.productService.deleteAllProducts().subscribe(data => console.log(data))
    }
    this.fetchAllProducts();
  }

  deleteProduct(id) {
    let status = confirm('Are you sure?')
    if (status) {
      this.productService.deleteProduct(id)
      .subscribe(data => {
        console.log(data)
        this.fetchAllProducts();
      })
    }
  }
}