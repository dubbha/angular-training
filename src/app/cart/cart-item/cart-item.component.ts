import { Component, OnInit, OnDestroy, Input, HostBinding, HostListener } from '@angular/core';

import { CartService } from '../cart.service';
import { CartItem } from './cart-item.model';
import { LocalStorageService } from '../../shared/local-storage.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.sass']
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input() product: CartItem;

  @HostBinding('class')
  className = 'basic';

  @HostListener('mouseenter')
  onMoutseEnter() { this.className = 'highlighted'; }

  @HostListener('mouseleave', ['$event'])
  onMoutseLeave() { this.className = 'basic'; }


  constructor(
    public cartService: CartService,
    public localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.cartService.notifyServerOnInit(this.product);

    this.localStorageService.setItem('lastAddedProduct', this.product);
  }

  ngOnDestroy() {
    this.cartService.notifyServerOnDestroy(this.product);

    const storedLastAddedProduct = this.localStorageService.getItem('lastAddedProduct');
    if (storedLastAddedProduct && storedLastAddedProduct.id === this.product.id) {
      this.localStorageService.removeItem('lastAddedProduct');
    }
  }
}
