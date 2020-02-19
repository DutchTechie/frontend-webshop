import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductCatalogComponent } from './products/product-catalog/product-catalog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductCatalogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
