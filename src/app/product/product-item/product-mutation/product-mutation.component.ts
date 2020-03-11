import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { ProductService } from 'src/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-mutation',
  templateUrl: './product-mutation.component.html',
  styleUrls: ['./product-mutation.component.css']
})

export class ProductMutationComponent implements OnInit {
  @Input() product: Product;
  @Input() user: User = null;
  @Input() visitedDetailsPage: boolean;
  @Input() failedLoadingImage: boolean;
  @Output() goBackToDetailsPage = new EventEmitter<boolean>();
  @Output() productToMutate = new EventEmitter<Product>();
  productForm: FormGroup;
  pageIsLoading: boolean = false;

  // TODO: update this class to also support start and stop editing actions

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
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

  // TODO: Update this: use store here
  private mutateProduct(product: Product) {
    let noImageFoundImagePath: string = "https://www.wiersmaverhuizingen.nl/wp-content/themes/consultix/images/no-image-found-360x260.png";
    if (this.failedLoadingImage === true || product.imagePath === null) {
      product.imagePath = noImageFoundImagePath;
    }
    this.productToMutate.emit(product);
  }

  userIsAdmin(user: User): boolean {
    return true;
    // if (user === null) {
    //   return false;
    // }
    // return (user.isAdmin === true);
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
      this.updateImage(value);
    });
  }

  updateImage(imagePath: string) {
    this.productService.updatedImagePath.next(imagePath);
  }
}
