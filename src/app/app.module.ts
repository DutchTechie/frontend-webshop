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
import { LoginComponent } from './accounts/login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminComponent } from './home/admin/admin.component';
import { ConsumerComponent } from './home/consumer/consumer.component';
import { ProductGridViewComponent } from './products/product-catalog/product-grid-view/product-grid-view.component';
import { ProductListViewComponent } from './products/product-catalog/product-list-view/product-list-view.component';
import { ProductCreateFormComponent } from './products/product-create-form/product-create-form.component'

const appRoutes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: ShoppingCartComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ProductCatalogComponent,
    ProductAdminOptionsComponent,
    ApiComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ShoppingCartComponent,
    AdminComponent,
    ConsumerComponent,
    ProductGridViewComponent,
    ProductListViewComponent,
    ProductCreateFormComponent,
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
