import { Component, OnInit, OnDestroy, Input, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';

import { CartService } from '../cart.service';
import { CartItem } from './cart-item.model';
import { LocalStorageService } from '../../core/services';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.cartService.notifyServerOnInit(this.product);
  }

  ngOnDestroy() {
    this.cartService.notifyServerOnDestroy(this.product);
  }
}
