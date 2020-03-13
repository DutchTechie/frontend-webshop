/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component'
import { ProductResolverService } from '../../services/product-resolver.service'
import { ProductItemComponent } from './product-item/product-item.component';
import { AuthGuard } from 'src/services/auth.guard';

//=============================================================================

const appRoutes : Routes = [
  { path: '', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'product/:mode', component: ProductItemComponent, canActivate: [AuthGuard] },
  { path: 'product/:mode/:id', component: ProductItemComponent, resolve: [ProductResolverService], canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}

//=============================================================================
