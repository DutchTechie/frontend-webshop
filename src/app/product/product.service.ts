import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../home/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  // TODO: Modify the product resource on the server to work accordingly
  public fetchAllProducts() {
    return this.http.get("http://localhost:8080/hello-world").pipe(map(data => {
      const productArray = [];
      if(data instanceof Array){
        let index = 1
        for (const key in data) {
          productArray.push(
            new Product(
              "" + index,
              data[key]["name"], 
              data[key]["description"], 
              "http://www.oxygenmelody.com/wp-content/uploads/2018/03/nike-w-air-max-thea-ultra-prm-womens-shoes-beautiful-power.jpg",
              300,
              7
            )
          )
          index++;
        }
      }
      return productArray
    }))
  }

  // TODO: Replace urls
  // TODO: Add the id attribute to the product model
  public addNewProduct(product: Product) {
    return this.http.post("http://localhost:8080/hello-world", {
      product
    })
  }

  // TODO: Create an error handler
  public updateProduct(product: Product) {
    return this.http.put<Product>("http://localhost:8080/hello-world", {
      id: 4,
      name: "fuck",
      description: product.description
    })
  }

  // const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
  public deleteProduct(id: string) {
    const url = `http://localhost:8080/hello-world/${id}`
    return this.http.delete<Product>(url);
  }

  public deleteAllProducts() {
    return this.http.delete("http://localhost:8080/hello-world")
  }

}