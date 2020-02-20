import { Component, OnInit } from '@angular/core';
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
  newProductName = ""
  newProductDescription = ""
  newProductImageUrl = ""

  updateDetails(event) {
    console.log(event)
    alert(event)
  }

  constructor(private http: HttpClient, private api: ApiComponent) { }

  ngOnInit(): void {
    this.fetchAllProducts()
  }

  fetchAllProducts() {
    this.api.fetchAllProducts().subscribe(data => {
      this.products = data})
  }

  createNewProduct() {
    this.api.addNewProduct(this.newProductName, 
      this.newProductDescription,
      this.newProductImageUrl).subscribe(data => console.log(data))
  }
}
