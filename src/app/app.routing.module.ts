import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './shared/components';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { MessageComponent } from './shared/components/message/message.component';

const routes: Routes = [
  { path: 'shop', component: ProductListComponent },
  { path: 'product/:id', component: ProductCardComponent },
  { path: 'checkout', loadChildren: 'app/checkout/checkout.module#CheckoutModule' },
  { path: 'display', component: MessageComponent, outlet: 'message' },
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

export const appRouterComponents = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
