import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { Product } from './product.model';  // TODO: Add the product model to its service
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = []
  private userSub : Subscription;
  user: User = null
  
  constructor(
    private authService: AuthService, 
    private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchAllProducts()
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
  
  fetchAllProducts() {
    this.productService.fetchAllProducts().subscribe(data => {
      this.products = data
    })
  }

  deleteAllProducts() {
    let status = confirm('Are you sure?') // dry?
    if (status) {
      console.log("delete all products")
      this.productService.deleteAllProducts().subscribe(data => this.products = [])
    }
  }

  addToCart() {
    console.log("Add product to cart")
  }

  deleteProduct(id) {
    let status = confirm('Are you sure?')
    if (status) {
      this.productService.deleteProduct(id)
      .subscribe(data => console.log(data))
    }
  }
}