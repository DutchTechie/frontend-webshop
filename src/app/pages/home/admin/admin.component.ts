import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  @Input() products: Product[];
  @Input() user: User;
  @Output() pageToRedirectUser = new EventEmitter<string>();

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    if (this.userIsAdmin(this.user) === false) {
      this.redirectUser(); // TODO: Implement error message when home
    }
  }

  private userIsAdmin(user: User): boolean {
    if (user === null) {
      return false;
    }
    return (user.isAdmin === true);
  }

  redirectUser() {
    this.pageToRedirectUser.emit('/login');
  }

  fetchAllProducts() {
    this.productService.fetchAllProducts().subscribe(data => {
      this.products = data
    })
  }

  deleteAllProducts() {
    if (this.adminIsSureToDelete()) {
      this.productService.deleteAllProducts()
      .subscribe(data => console.log(data))
      this.fetchAllProducts();
    }
  }

  deleteProduct(id) {
    if (this.adminIsSureToDelete()) {
      this.productService.deleteProduct(id)
      .subscribe(data => {
        console.log(data)
        this.fetchAllProducts();
      })
    }
  }

  private adminIsSureToDelete(): boolean {
    return confirm('Are you sure?');
  }
}
