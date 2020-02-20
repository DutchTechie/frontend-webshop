import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model'
import { map } from 'rxjs/operators'

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

  ngOnInit(): void {}

  createNewProduct() {
    // let product = 
    

    // We're going to create a simple fetch method here for now, just a simple test
    this.http.get("http://localhost:8080/hello-world")
    .pipe(map(data => {
      const productArray = [];

      // NOTE: there is no need for this since the raw data works
      // for (const key in data) {
      //   if (data.hasOwnProperty(key)) {
      //     productArray.push({...data[key], id: key})
      //   }
      // }

      // so, simply push the raw data to array
      if (data.hasOwnProperty("name") && data.hasOwnProperty("description")) {
        productArray.push(new Product(data["name"], data["description"], "path"))
      }

      return productArray;
    }))
    .subscribe(data => 
      this.products = data)
  }
}
