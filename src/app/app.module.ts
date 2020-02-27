import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthComponent } from './auth/auth.component'
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AccountComponent } from './account/account.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component'

const appRoutes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:mode', component: ProductComponent },
  { path: 'product/:mode/:id', component: ProductComponent },  // TODO: Update path
  { path: 'account', component: AccountComponent },
  { path: 'signup', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent }
  // ... canActivate: [AuthGuard] <-- use this for for example, going to the admin page or personal user page
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ShoppingCartComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AccountComponent,
    ProductComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [HeaderComponent], // TODO: Investigate this! It works, but why?
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
