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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  public fetchAllProducts() {
    return this.http.get("http://localhost:8080/hello-world")
    .pipe(map(data => {
      const productArray = [];
      if(data instanceof Array){
        for (const key in data) {
          if (data[key].hasOwnProperty("name") && data[key].hasOwnProperty("description")) {
            productArray.push(
              new Product(
                data[key]["name"], 
                data[key]["description"], 
                "http://www.oxygenmelody.com/wp-content/uploads/2018/03/nike-w-air-max-thea-ultra-prm-womens-shoes-beautiful-power.jpg",
                300,
                7
              )
            )
          }
        }
      }
      return productArray
    }))
  }

  public addNewProduct(
    newProductName : String, 
    newProductDescription:String, 
    newProductImagePath: String) {
    return this.http.post("http://localhost:8080/hello-world", {
      "name" : newProductName,
      "description" : newProductDescription,
      "imagePath" : newProductImagePath
    })
  }

  public deleteProduct() {
    return this.http.delete("http://localhost:8080/hello-world")
  }
}
