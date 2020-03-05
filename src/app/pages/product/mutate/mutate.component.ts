import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { ProductService } from 'src/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
// import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-mutate',
  templateUrl: './mutate.component.html',
  styleUrls: ['./mutate.component.css']
})

// TODO: Use subject

export class MutateComponent implements OnInit {
  @Input() product: Product;
  @Input() user: User = null;
  @Input() visitedDetailsPage: boolean;
  @Output() goBackToDetailsPage = new EventEmitter<boolean>();
  productForm: FormGroup;
  pageIsLoading: boolean = false;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    // if (this.product == null) {
    //   this.product = new Product();
    // }
    this.pageIsLoading = true;
  }

  ngOnChanges() {
    this.initForm();
    this.pageIsLoading = false;
  }

  redirectUser(page) {
    this.router.navigate([page]);
  }

  onSubmit() {
    if (!this.productForm.valid) {
      return;
    }
    const product = this.productForm.value;
    if (this.product.id !== null) {
      product.id = this.product.id;
    }
    this.mutateProduct(product);
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

  initForm() {
    if (this.product == null) {
      this.product = new Product();
    }
    this.productForm = new FormGroup({
      'name': new FormControl(this.product.name, Validators.required),
      'imagePath': new FormControl(this.product.imagePath, { updateOn: 'blur'}),
      'description': new FormControl(this.product.description),
      'stock': new FormControl(this.product.stock, [ Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
      'price': new FormControl(this.product.price, [ Validators.required, Validators.pattern(/^[0-9]+(.[0-9]{0,2})?$/)]),
    });

    this.productForm.get('imagePath').valueChanges.subscribe(value => {
      console.log(`I changed value 😃: ${value}`);
      this.updateImage(value);
    });
  }

  updateImage(imagePath: string) {
    this.productService.updatedImagePath.next(imagePath);
    console.log("called update image");
  }
}
