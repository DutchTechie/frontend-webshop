import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model'

// TODO: Place this somewhere else, such as in a service
import { HttpClient } from '@angular/common/http'

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

  // TODO: Make use of the @viewChild instead
  newProductName = ""
  newProductDescription = ""
  newProductImageUrl = ""

  updateDetails(event) {
    console.log(event)
    alert(event)
  }

  constructor(private http: HttpClient) { }

  createNewProduct() {
    // let product = 
    this.products.push(new Product(this.newProductName, this.newProductDescription, this.newProductImageUrl))

    // We're going to create a simple fetch method here for now, just a simple test
    this.http.get("http://localhost:8080/hello-world").subscribe(data => console.log(data))
  }

  ngOnInit(): void {
  }

}
