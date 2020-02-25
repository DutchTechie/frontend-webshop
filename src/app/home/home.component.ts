import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { ApiComponent } from '../api/api.component';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentProduct = {name: "No product select", description: "", imagePath: ""}
  products: Product[] = []

  private userSub : Subscription;
  user: User = null
  
  constructor(private authService: AuthService, private api:ApiComponent) { }

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

  onProductSelected(product) {
    this.currentProduct = product
  }
  
  fetchAllProducts() {
    this.api.fetchAllProducts().subscribe(data => {
      this.products = data})
  }

  deleteAllProducts() {
    this.api.deleteProduct().subscribe(data => this.products = [])
  }
}