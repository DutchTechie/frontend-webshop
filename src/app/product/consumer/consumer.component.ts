/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/user.model';
import { Product } from 'src/models/product.model';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';

//=============================================================================

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})

//=============================================================================

export class ConsumerComponent implements OnInit {
  @Input() productSubs: Observable<Product[]>
  @Input() user: User;
  @Output() pageToRedirectUser = new EventEmitter<string>();
  pageIsLoading: boolean = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  ngOnChanges() {}

  addToCart(productId) {
    if(this.user != null) {
      if (this.authenticationService.userIsConsumer(this.user)) {
        const id = this.user.userId;
        this.shoppingCartService.addToCart(id, productId)
          .subscribe(data => console.log(data));
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['account']);
    }
  }
}

//=============================================================================
