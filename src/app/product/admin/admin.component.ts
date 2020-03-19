/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer'
import * as ProductActions from '../../../reducers/product.actions'
import { Product } from 'src/models/product.model';
import { slideOutAnimation } from 'src/app/shared/animations/fade-out.animation';
import { changeState } from 'src/app/shared/animations/change-state.animation';
import { Observable } from 'rxjs';
import { animateOut } from '../../shared/animations/animate-out.animation';

//=============================================================================

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [slideOutAnimation, changeState, animateOut]
})
export class AdminComponent implements OnInit {
  @Input() productSubs: Observable<Product[]>
  @Output() fetchAllProductsEmitter = new EventEmitter<void>();
  hideAllProductsPriorToDeletingThem: boolean = false;
  calledEndAnimationOnce: boolean = false;
  slideOut: string = 'normal';
  product: Product = null;


  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  fetchAllProducts() {
    this.fetchAllProductsEmitter.emit();
    this.hideAllProductsPriorToDeletingThem = false;
  }

  endOfDeleteAllAnimation() {
    if (this.calledEndAnimationOnce == true) {
      this.hideAllProductsPriorToDeletingThem = true;
      this.calledEndAnimationOnce = false;
      this.deleteAllProducts();
    }
  }

  startDeletingAllProducts() {
    if (this.adminIsSureToDelete()) {
      this.calledEndAnimationOnce = true;
      this.slideOut = 'slideOut';
    }
  }

  onEndDeleteProductAnimation() {
    if (this.product !== null) {
      this.product.visible = false;
      this.deleteProduct(+this.product.id);
      this.product = null;
    }
  }

  startDeletingProduct(product) {
    if (this.adminIsSureToDelete()) {
      if (product.state === 'normal') {
        product.state = 'slideOut';
      } else {
        product.state = 'normal';
      }
      this.product = product;
    }
  }

  deleteProduct(id) {
    this.store.dispatch(new ProductActions.DeleteProduct(id));
  }

  deleteAllProducts() {
    this.store.dispatch(new ProductActions.DeleteAllProduct());
  }

  private adminIsSureToDelete(): boolean {
    return confirm('Are you sure?');
  }
}

//=============================================================================
