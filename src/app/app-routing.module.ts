/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './miscellaneous/page-not-found/page-not-found.component';
import { AuthGuard } from 'src/services/auth.guard';

//=============================================================================

const appRoutes : Routes = [
  {
    path: "",
    loadChildren: () => import("./product/product.module").then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: "account",
    loadChildren: () => import("./authentication/authentication.module").then(m => m.AuthenticationModule),
    canActivate: [AuthGuard]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}

//=============================================================================
