import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model'

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  products : Product[] = [
    new Product("shoe", "What can I say? It's a bloody shoe.", "no path"),
    new Product("shoe 2", "What can I say? It's a bloody shoe.", "no path")
  ];

  newProductName = ""
  newProductDescription = ""
  newProductImageUrl = ""

  updateDetails(event) {
    console.log(event)
    alert(event)
  }

  createNewProduct() {
    // let product = 
    this.products.push(new Product(this.newProductName, this.newProductDescription, this.newProductImageUrl))
  }

  constructor() { }

  ngOnInit(): void {
  }

}
