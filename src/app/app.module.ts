import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AuthenticationComponent } from './pages/account/authentication/authentication.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AccountComponent } from './pages/account/user-information/account.component';
import { ProductComponent } from './pages/product/product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ConsumerComponent } from './pages/home/consumer/consumer.component';
import { AdminComponent } from './pages/home/admin/admin.component';
import { DetailsComponent } from './pages/product/details/details.component';
import { MutateComponent } from './pages/product/mutate/mutate.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationGuardService } from 'src/services/authorization-guard.service';

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
    ConsumerComponent,
    AdminComponent,
    DetailsComponent,
    MutateComponent,
    PageNotFoundComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [HeaderComponent], // TODO: Investigate this! It works, but why?
  providers: [AuthorizationGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
