import { Component, OnInit, Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Product } from '../products/product.model'

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})

@Injectable({providedIn: 'root'})
export class ApiComponent implements OnInit {
  products : Product[] = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  public fetchAllProducts() {
    // We're going to create a simple fetch method here for now, just a simple test
    return this.http.get("http://localhost:8080/hello-world")
    .pipe(map(data => {
      const productArray = [];
      if(data instanceof Array){
        for (const key in data) {
          if (data[key].hasOwnProperty("name") && data[key].hasOwnProperty("description")) {
            productArray.push(new Product(data[key]["name"], data[key]["description"], "path"))
          }
        }
      }

      return productArray
    }))
  }

  public addNewProduct(newProductName : String, newProductDescription:String, newProductImagePath: String) {
    return this.http.post("http://localhost:8080/hello-world", {
      "name" : newProductName,
      "description" : newProductDescription,
      "imagePath" : newProductImagePath
    })
  }
}
