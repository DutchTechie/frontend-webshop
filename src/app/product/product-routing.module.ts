import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component'
import { ProductResolverService } from '../../services/product-resolver.service'
import { ProductItemComponent } from './product-item/product-item.component';

const appRoutes : Routes = [
    { path: '', component: ProductComponent },
    { path: 'product/:mode', component: ProductItemComponent },
    { path: 'product/:mode/:id', component: ProductItemComponent, resolve: [ProductResolverService] }
  ]

  @NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
  })
  export class ProductRoutingModule {}
