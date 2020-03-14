/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';

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
export class ShoppingCartModule {}

//=============================================================================
