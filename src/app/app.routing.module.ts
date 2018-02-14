import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './shared/components';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: 'shop', component: ProductListComponent },
  { path: 'product/:id', component: ProductCardComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

export const appRouterComponents = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  // re-export RouterModule in order to have access
  // to its directives in main module.
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
