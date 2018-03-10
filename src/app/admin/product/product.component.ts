import { Component, Input, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './../../+store';
import * as RouterActions from './../../+store/actions/router.actions';

import { Product } from '../../products/product/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  quantity = 1;

  @Input() product: Product;

  @HostBinding('class')
  className = 'basic';

  @HostListener('mouseenter')
  onMouseEnter() { this.className = 'highlighted'; }

  @HostListener('mouseleave')
  onMouseLeave() { this.className = 'basic'; }

  @HostListener('click')
  onClick() { this.openProductEditor(); }

  constructor(
    private store: Store<AppState>,
  ) {}

  openProductEditor() {
    this.store.dispatch(new RouterActions.Go({ path: [`/admin/edit/${this.product.id}`] }));
  }
}
