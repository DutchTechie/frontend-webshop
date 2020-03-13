/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { slideOutAnimation } from 'src/app/shared/animations/fade-out.animation';
import { changeState } from 'src/app/shared/animations/change-state.animation';
import { Observable } from 'rxjs';

const animateOut = [
  trigger('animateOut', [
    state('normal', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    state('slideOut', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('normal => slideOut', [
      animate(400, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ])
]

//=============================================================================

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [slideOutAnimation, changeState, animateOut]
})

//=============================================================================

export class AdminComponent implements OnInit {
  @Input() productSubs: Observable<Product[]>
  @Input() user: User;
  @Output() productToDelete = new EventEmitter<number>();
  @Output() deleteAllProducts = new EventEmitter<void>();
  @Output() fetchAllProductsEmitter = new EventEmitter<void>();
  pageIsLoading: boolean = false;

  doneDeleteAllOnce = false;

  isOpen = true;
  slideOut = 'normal';
  calledEndAnimationOnce = false;
  product: Product = null;
  deletedOneProduct = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  test() {
    this.slideOut = 'slideOut';
    console.log("test called");
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {}

  private userIsAdmin(user: User): boolean {
    if (user === null) {
      return false;
    }
    return (user.isAdmin === true);
  }

  fetchAllProducts() {
    this.fetchAllProductsEmitter.emit();
  }

  endOfDeleteAllAnimation(event) {
    if (this.calledEndAnimationOnce == true) {
      this.doneDeleteAllOnce = true;
      this.calledEndAnimationOnce = false;
      this.deleteAllProducts.emit();
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
      this.deletedOneProduct = true;
      this.product.visible = false;
      this.productToDelete.emit(+this.product.id);
      this.product = null;
    }
  }

  deleteProduct(product) {
    this.deletedOneProduct = false;
    if (this.adminIsSureToDelete()) {
      if (product.state === 'normal') {
        product.state = 'slideOut';
      } else {
        product.state = 'normal';
      }
      this.product = product;
    }
  }

  private adminIsSureToDelete(): boolean {
    return confirm('Are you sure?');
  }
}

//=============================================================================
