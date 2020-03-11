import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './miscellaneous/page-not-found/page-not-found.component';

// why unit test?

// Guard against breaking changes
// Analyze code behavrior (expected and unexpected)
// Reveal design mistakes

const appRoutes : Routes = [
    { path: "", redirectTo: "/products", pathMatch: "full" },
    {
      path: "products",
      loadChildren: () =>
        import("./product/product.module").then(m => m.ProductModule)
    },
    {
      path: "login",
      loadChildren: () => import("./authentication/authentication.module").then(m => m.AuthenticationModule)
    },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
  ]

  @NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
