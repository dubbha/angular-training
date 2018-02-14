import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from '../product/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product/product.service';

@Component({
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit {
  product: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.product = this.productService.getProductById(+params.id);
    });
  }

  getAlternative(id) {
    return this.productService.getProductById(id);
  }

  openProductCard(id) {
    this.router.navigate([`/product/${id}`]);
  }

  backToProducts() {
    this.router.navigate([`/shop`]);
  }
}
