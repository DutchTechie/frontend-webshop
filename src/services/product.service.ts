import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';

/*

let idParams = new HttpParams();
idParams = idParams.append('id', id);

return this.http.delete<Product>(this.PRODUCT_PATH_URI, {
  params: idParams
}).pipe(...etc.
*/

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  updatedImagePath = new Subject<string>();

  constructor(private http: HttpClient) { }
  private PRODUCT_PATH_URI: string = "http://localhost:8080/products"

  public fetchAllProducts() {
    return this.http.get<Product[]>(this.PRODUCT_PATH_URI,
      // {
      //   headers: new HttpHeaders({ 'Custom-header' : 'Hello world!' })
      // }
    )
    .pipe(
      map(products => {
        return products;
      }),
      catchError(errorResponse => {
        return throwError(errorResponse)
      })
    );
  }

  public fetchProduct(id: string) {
    const getProductUri: string = `${this.PRODUCT_PATH_URI}/${id}`;

    return this.http.get<Product>(getProductUri).pipe(
      map(data =>
      {
        return data;
      }),
      catchError(errorResponse => {
        return throwError(errorResponse)
      })
    );
  }

  public addNewProduct(product: Product) {
    return this.http.post(this.PRODUCT_PATH_URI, product).pipe(map(data => {
      return data;
    }),
    catchError(errorResponse => {
      return throwError(errorResponse)
    }))
  }

  // TODO: Create an error handler
  public updateProduct(product: Product) {
    return this.http.put(this.PRODUCT_PATH_URI, product).pipe(map(data => {
      return data;
    }),
    catchError(errorResponse => {
      return throwError(errorResponse)
    }))
  }

  public deleteProduct(id: string) {
    const deleteProductUri: string = `${this.PRODUCT_PATH_URI}/${id}`;

    return this.http.delete<Product>(deleteProductUri).pipe((data => {
      return data;
    }),
    catchError(errorResponse => {
      return throwError(errorResponse);
    }));
  }

  public deleteAllProducts() {
    return this.http.delete(this.PRODUCT_PATH_URI).pipe((data => {
      return data;
    }),
    catchError(errorResponse => {
      return throwError(errorResponse);
    }));
  }
}
