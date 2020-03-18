/*****************************************************************************
Represents a form for either creating a new product or
editing an existing one.

@author
******************************************************************************/

//=============================================================================

import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'
import * as ProductActions from '../../reducers/product.actions'
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/services/authentication.service';

//=============================================================================

@Component({
  selector: 'app-home',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private storeSub: Subscription;
  pageToRedirectUserTo : string;
  errorMessage : string = null;
  productSubs: Observable<Product []>;
  user: User = null;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.initializeUser();
    this.fetchAllProducts();
  }

  initializeUser() {
    this.authenticationService.getApplicationUser().subscribe(user => {
      this.user = user;
    });
  }

  fetchAllProducts() {
    this.store.dispatch(new ProductActions.FetchProducts())
    this.store
      .select('products')
      .pipe(map(productsState => productsState.products))
      .subscribe((products: Product[]) => {
        this.productSubs = of(products);
    });
  }

  showErrorAlert(errorMessage) { console.log(errorMessage);}

  userIsConsumer(): boolean {
    return this.authenticationService.userIsConsumer(this.user);
  }

  userIsAdmin(): boolean {
    return this.authenticationService.userIsAdmin(this.user);
  }

  ngOnDestroy() {
    if (this.storeSub) { this.storeSub.unsubscribe();}
  }
}

//=============================================================================
