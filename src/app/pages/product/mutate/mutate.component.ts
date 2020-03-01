import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { ProductService } from 'src/services/product.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mutate',
  templateUrl: './mutate.component.html',
  styleUrls: ['./mutate.component.css']
})

export class MutateComponent implements OnInit {
  @Input() product: Product;
  @Input() user: User = null;
  @Input() visitedDetailsPage: boolean;
  @Output() goBackToDetailsPage = new EventEmitter<boolean>();

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    if (this.product == null) {
      this.product = new Product();
    }
  }

  redirectUser(page) {
    this.router.navigate([page]);
  }

  onSubmit(productForm: NgForm) {
    if (!productForm.valid) {
      return;
    }
    if (this.userIsAdmin(this.user) === false) {
      this.redirectUser('/login'); // TODO: Implement error message when on login page
      return;
    }
    this.mutateProduct(this.product);
  }

  private mutateProduct(product: Product) {
    if (product.id == null) {
      this.addNewProduct(product);
    } else {
      this.updateCurrentProduct(product);
    }
  }

  addNewProduct(newProduct: Product) {
    this.productService.addNewProduct(newProduct).subscribe(data => {
      console.log(data);
      this.redirectUser('/');
    });
  }

  updateCurrentProduct(currentProduct: Product) {
    this.productService.updateProduct(currentProduct).subscribe(data => {
      console.log(data);
      this.redirectUser('/');
    });
  }

  userIsAdmin(user: User): boolean {
    if (user === null) {
      return false;
    }
    return (user.isAdmin === true);
  }

  handleOnBackPressed() {
    if (this.visitedDetailsPage === true) {
      this.goBackToDetailsPage.emit(true);
    } else {
      this.goBackToDetailsPage.emit(false);
    }
  }

}
