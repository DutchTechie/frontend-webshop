/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';

//=============================================================================

@NgModule({
  imports: [
    CommonModule,
    ShoppingCartRoutingModule
  ],
  declarations: [
    ShoppingCartComponent,
    CheckoutComponent
  ]
})
export class ShoppingCartModule { }

//=============================================================================
