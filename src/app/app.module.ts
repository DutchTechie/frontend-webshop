import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AuthenticationComponent } from './pages/account/authentication/authentication.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AccountComponent } from './pages/account/user-information/account.component';
import { ProductComponent } from './pages/product/product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component'

const appRoutes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:mode', component: ProductComponent },
  { path: 'product/:mode/:id', component: ProductComponent },  // TODO: Update path
  { path: 'account', component: AccountComponent },
  { path: 'signup', component: AuthenticationComponent },
  { path: 'login', component: AuthenticationComponent },
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
    AuthenticationComponent,
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
