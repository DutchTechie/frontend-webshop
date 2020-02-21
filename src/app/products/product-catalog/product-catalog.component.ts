import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from '../product.model'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { ApiComponent } from 'src/app/api/api.component';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  products : Product[] = [];

  // TODO: Make use of the @viewChild instead
  // TODO: Place this somewhere more appropiate
  newProductName = ""
  newProductDescription = ""
  newProductImageUrl = ""

  // We're passing something out of the component, so use output
  @Output() productSelected = new EventEmitter<{name: string, description: string, imagePath: string}>();

  constructor(private http: HttpClient, private api: ApiComponent) { }

  ngOnInit(): void {
    this.fetchAllProducts()
  }

  onProductSelect(product) {
    this.productSelected.emit({name: product.name, 
      description: product.description, 
      imagePath: product.imagePath})
  }

  // Keep the following in this component
  fetchAllProducts() {
    this.api.fetchAllProducts().subscribe(data => {
      this.products = data})
  }

  // TODO: put this in a seperate component
  createNewProduct() {
    this.api.addNewProduct(this.newProductName, 
      this.newProductDescription,
      this.newProductImageUrl).subscribe(data => console.log(data))
  }

  deleteAllProducts() {
    this.api.deleteProduct().subscribe(data => this.products = [])
  }
}
