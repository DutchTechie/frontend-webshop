/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/user.model';
import { Product } from 'src/models/product.model';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import * as PRODUCT_ROUTES from '../product.routes';
import * as AUTH_ROUTES from '../../authentication/auth.routes';
import * as fromApp from '../../app.reducer';
import * as ShoppingCartActions from '../../../reducers/shopping-cart.actions';
import { Store } from '@ngrx/store';
import { Cart } from 'src/models/cart.model';

//=============================================================================

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit {
  @Input() productSubs: Observable<Product[]>
  @Input() user: User;
  @Output() pageToRedirectUser = new EventEmitter<string>();
  pageIsLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {}

  ngOnChanges() {}

  addToCart(productId: string) {
    if(this.user != null) {
      if (this.authenticationService.userIsConsumer(this.user)) {
        const userId: string = this.user.userId;
        const cart: Cart = new Cart(
          userId,
          productId,
          1
        );

        // TODO: Make action more efficient by using withLatestFrom
        this.store.dispatch(new ShoppingCartActions.AddToCart(cart));
      } else {
        this.router.navigate([PRODUCT_ROUTES.ABSOLUTE_PATH_DEFAULT]);
      }
    } else {
      this.router.navigate([AUTH_ROUTES.ABSOLUTE_PATH_DEFAULT]);
    }
  }
}

//=============================================================================
