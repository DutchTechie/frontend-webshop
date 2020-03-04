import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AuthenticationComponent } from './pages/account/authentication/authentication.component';
import { AccountComponent } from './pages/account/user-information/account.component';
import { ProductComponent } from './pages/product/product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'
import { AuthorizationGuardService } from 'src/services/authorization-guard.service';

const appRoutes : Routes = [
    { path: '', component: HomeComponent },
    { path: 'product/:mode', component: ProductComponent, canActivate: [AuthorizationGuardService] },
    { path: 'product/:mode/:id', component: ProductComponent, canActivate: [AuthorizationGuardService] },
    { path: 'account', component: AccountComponent, canActivate: [AuthorizationGuardService] },
    { path: 'signup', component: AuthenticationComponent, canActivate: [AuthorizationGuardService] },
    { path: 'login', component: AuthenticationComponent, canActivate: [AuthorizationGuardService] },
    { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthorizationGuardService] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthorizationGuardService] },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
  ]

  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes),
    ],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }
