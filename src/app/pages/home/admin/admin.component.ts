import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { ProductService } from 'src/services/product.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  group,
  // ...
} from '@angular/animations';
import { slideOutAnimation } from 'src/app/shared/animations/fade-out.animation';
import { changeState } from 'src/app/shared/animations/change-state.animation';



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





@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [slideOutAnimation, changeState, animateOut]
})

export class AdminComponent implements OnInit {
  @Input() products: Product[];
  @Input() user: User;
  @Output() pageToRedirectUser = new EventEmitter<string>();
  pageIsLoading: boolean = false;

  doneDeleteAllOnce = false;

  isOpen = true;
  slideOut = 'normal';

  calledEndAnimationOnce = false;

  productToDelete = null;

  deletedOneProduct = false;



  toggle() {
    this.isOpen = !this.isOpen;
    // this.slideOut = !this.slideOut;
  }

  test() {
    this.slideOut = 'slideOut';
    console.log("test called");
  }

  constructor(
    private productService: ProductService
  ) { }

  // TODO: remove this when done with routes
  ngOnInit(): void {
    if (this.userIsAdmin(this.user) === false) {
      this.redirectUser(); // TODO: Implement error message when home
    }
    this.pageIsLoading = true;
  }

  ngOnChanges() {
    this.pageIsLoading = false;
  }

  private userIsAdmin(user: User): boolean {
    if (user === null) {
      return false;
    }
    return (user.isAdmin === true);
  }

  redirectUser() {
    this.pageToRedirectUser.emit('/login');
  }

  fetchAllProducts() {
    if (this.slideOut === 'slideOut') {
      this.slideOut = 'normal';
    }
    this.productService.fetchAllProducts().subscribe(data => {
      this.products = data;
      this.products.map((product) => ( product.state = 'normal', product.visible = true ))
      this.doneDeleteAllOnce = false;
    })
  }

  endOfDeleteAllAnimation(event) {
    if (this.calledEndAnimationOnce == true) {
      this.doneDeleteAllOnce = true;
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

  deleteAllProducts() {
    this.productService.deleteAllProducts()
    .subscribe(data => { console.log(data) }) // this.fetchAllProducts()});
  }

  onEndDeleteProductAnimation() {
    // this.slideOut = 'normal';
    // if (this.productToDelete !== null) {
    //   console.log(this.productToDelete);
    //   this.productService.deleteProduct(this.productToDelete.id)
    //   .subscribe(data => {
    //     console.log(data);
    //     this.productToDelete = null;
    //     this.fetchAllProducts();
    //     console.log(this.slideOut)
    //   })
    // }
    if (this.productToDelete !== null) {
      console.log(this.productToDelete);
      console.log(this.productToDelete.state);
      this.deletedOneProduct = true;
      this.productToDelete.visible = false;

      this.productService.deleteProduct(this.productToDelete.id)
        .subscribe(data => {
          console.log(`The data being deleted is:\t${data}`);
          this.productToDelete = null;
          this.fetchAllProducts();
        })
    }
  }

  deleteProduct(product) {
    this.deletedOneProduct = false;
    if (this.adminIsSureToDelete()) {
      // console.log(product);
      if (product.state === 'normal') {
        product.state = 'slideOut';
      } else {
        product.state = 'normal';
      }
      this.productToDelete = product;
    }
    // console.log(event.path[2]);
    // this.slideOut = 'slideOut';
    // console.log(event.path[2]);
  }

  // deleteProduct(id) {
  //   // this.slideOut = !this.slideOut;
  //   if (this.adminIsSureToDelete()) {
  //     this.slideOut = 'slideOut';
  //     // this.productService.deleteProduct(id)
  //     // .subscribe(data => {
  //     //   console.log(data)
  //     //   this.fetchAllProducts();
  //     // })
  //   }
  // }

  private adminIsSureToDelete(): boolean {
    return confirm('Are you sure?');
  }
}
