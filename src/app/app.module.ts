import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductCatalogComponent } from './products/product-catalog/product-catalog.component';
import { ProductAdminOptionsComponent } from './products/product-admin-options/product-admin-options.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiComponent } from './api/api.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductCatalogComponent,
    ProductAdminOptionsComponent,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
