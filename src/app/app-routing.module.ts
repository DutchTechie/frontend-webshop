/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './miscellaneous/page-not-found/page-not-found.component';
import { AuthGuard } from 'src/services/auth.guard';
import * as PRODUCT_ROUTES from './product/product.routes';
import * as AUTH_ROUTES from './authentication/auth.routes';
import * as SHOPPING_CART_ROUTES from './shopping-cart/shopping-cart.routes'

//=============================================================================

const appRoutes : Routes = [
  {
    path: PRODUCT_ROUTES.ABSOLUTE_PATH_DEFAULT,
    loadChildren: () => import("./product/product.module").then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: AUTH_ROUTES.ABSOLUTE_PATH_DEFAULT,
    loadChildren: () => import("./authentication/authentication.module").then(m => m.AuthenticationModule),
    canActivate: [AuthGuard]
  },
  {
    path: SHOPPING_CART_ROUTES.ABSOLUTE_PATH_DEFAULT,
    loadChildren: () => import("./shopping-cart/shopping-cart-routing.module").then(m => m.ShoppingCartRoutingModule)
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}

//=============================================================================
