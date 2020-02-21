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
import { FooterComponent } from './footer/footer.component'

const appRoutes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'login', component: LoginComponent }
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
