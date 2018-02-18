import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../products/product/product.model';
import { ProductService } from '../../products/products.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
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
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit() {}

  getAlternative(id) {
    return this.productService.getProductById(id);
  }

  openProductEditor() {
    this.router.navigate([`/admin/edit/${this.product.id}`]);
  }
}