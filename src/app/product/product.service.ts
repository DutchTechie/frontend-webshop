import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../home/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  private PRODUCT_PATH_URI: string = "http://localhost:8080/products"

  public fetchAllProducts() {
    return this.http.get<Product[]>(this.PRODUCT_PATH_URI).pipe(map(products => 
    {
      return products;
    }));
  }

  public fetchProduct(id: String) {
    const getProductUri: string = `${this.PRODUCT_PATH_URI}/${id}`;
    return this.http.get<Product>(getProductUri).pipe(map(data => 
    {
      return data;
    }));
  }

  public addNewProduct(product: Product) {
    return this.http.post(this.PRODUCT_PATH_URI, product).pipe(map(data => {
      return data;
    }))
  }

  // TODO: Create an error handler
  public updateProduct(product: Product) {
    const uri = `${this.PRODUCT_PATH_URI}`;
    return this.http.put(uri, product).pipe(map(data => {
      return data;
    }))
  }

  public deleteProduct(id: string) {
    const deleteProductUri: string = `${this.PRODUCT_PATH_URI}/${id}`;
    return this.http.delete<Product>(deleteProductUri);
  }

  public deleteAllProducts() {
    return this.http.delete(this.PRODUCT_PATH_URI);
  }
}