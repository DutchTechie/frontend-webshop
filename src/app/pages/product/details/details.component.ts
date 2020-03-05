import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  @Input() product: Product;
  @Input() user: User = null;
  @Output() pageToRedirectUser = new EventEmitter<string>();
  @Output() switchToMode = new EventEmitter<boolean>();
  pageIsLoading: boolean = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const productId: any = this.activatedRoute.snapshot.paramMap;
    console.log(productId);
    this.pageIsLoading = true;
  }

  // TODO: Don't have it here, put it in the parent component instead!
  ngOnChanges() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (this.product != null) {
          this.product.id = params['id'];
          console.log(this.product.id);
        }
        this.pageIsLoading = false;
      }
    );
  }

  handleMainButtonClick() {
    if (this.userIsAdmin(this.user)) {
      this.switchToMode.emit(true);
    } else {
      this.addToCart(this.product.id);
    }
  }

  userIsAdmin(user: User): boolean {
    if (user === null) {
      return false;
    }
    return (user.isAdmin === true);
  }

  // TODO: Make this globally accessible
  addToCart(productId) {
    if(this.user != null) {
      if (this.user.isAdmin === false) {
        let id = this.user.userId;
        this.shoppingCartService.addToCart(id, productId)
          .subscribe(data => console.log(data));
      }
      this.redirectUser('/');
    } else {
      this.redirectUser('/login');
    }
  }

  redirectUser(page) {
    this.router.navigate([page]);
  }
}
