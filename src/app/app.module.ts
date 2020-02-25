import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductCatalogComponent } from './products/product-catalog/product-catalog.component';
import { ProductAdminOptionsComponent } from './products/product-admin-options/product-admin-options.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiComponent } from './api/api.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ConsumerComponent } from './home/consumer/consumer.component';
import { ProductGridViewComponent } from './products/product-catalog/product-grid-view/product-grid-view.component';
import { ProductListViewComponent } from './products/product-catalog/product-list-view/product-list-view.component';
import { ProductCreateFormComponent } from './products/product-create-form/product-create-form.component'
import { AuthComponent } from './auth/auth.component'
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AccountComponent } from './account/account.component'

const appRoutes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'signup', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'cart', component: ShoppingCartComponent }
  // ... canActivate: [AuthGuard] <-- use this for for example, going to the admin page or personal user page
]

@NgModule({
  declarations: [
    AppComponent,
    ProductCatalogComponent,
    ProductAdminOptionsComponent,
    ApiComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ShoppingCartComponent,
    ConsumerComponent,
    ProductGridViewComponent,
    ProductListViewComponent,
    ProductCreateFormComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [HeaderComponent], // TODO: Investigate this! It works, but why?
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
