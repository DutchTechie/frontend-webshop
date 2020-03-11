import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'
import * as ProductActions from '../../reducers/product.actions'
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  pageToRedirectUserTo : string;
  private storeSub: Subscription;
  errorMessage : string = null;
  productSubs: Observable <Product[]>
  user: User = null;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ProductActions.FetchProducts())

    // TODO: Add loading to home component instead
    this.storeSub = this.store
      .select('products')
      .pipe(map(productsState => productsState.products))
      .subscribe((products: Product[]) => {
        this.productSubs = of(products);
    })
  }

  fetchAllProducts() {
    console.log("The fetch all products in the home component is being called.")
    this.store.dispatch(new ProductActions.FetchProducts())
    this.store
      .select('products')
      .pipe(map(productsState => productsState.products))
      .subscribe((products: Product[]) => {
        this.productSubs = of(products);
        console.log(this.productSubs)
    })
  }

  showErrorAlert(errorMessage) {
    console.log(errorMessage);
  }

  deleteProduct(id) {
    this.store.dispatch(new ProductActions.DeleteProduct(id))
  }

  deleteAllProducts() {
    console.log("Delete all products!!")
    this.store.dispatch(new ProductActions.DeleteAllProduct());
  }

  // TODO: We can probably soon get rid of this code since we're using
  // ngrx
  userIsConsumer(user: User) {
    return false;
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  redirectUser(pageToRedirectUserTo) {
    this.router.navigate([pageToRedirectUserTo]);
  }
}
