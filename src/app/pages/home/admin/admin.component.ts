import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  @Input() products: Product[];
  @Input() user: User;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {}

  addToCart(productId) {
    if (this.user === null || this.user.isAdmin === false) {
      this.redirectUserToLoginPage(); // TODO: Implement error message when home
    } else {
      let id = this.user.userId;
    }
  }

  redirectUserToLoginPage() {
    this.router.navigate(['/login']);
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
