import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../../products/product/product.model';
import { Category } from '../../products/product/product.enum';
import { ProductService } from '../../products/products.service';

@Component({
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.sass']
})
export class ProductEditorComponent implements OnInit {
  product: Product;
  otherProducts: Array<Product>;
  categories: Array<string>;
  newMaterial: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.product = this.productService.getProductById(+params.id);
      this.otherProducts = this.productService.getProducts()
        .filter(product => product.id !== +params.id);
    });
    this.categories = Object.keys(Category).map(key => Category[key]);
  }

  getAlternative(id) {
    return this.productService.getProductById(id);
  }

  removeMaterial(material: string): void {
    this.productService.removeProductMaterial(this.product.id, material);
  }

  addMaterial(): void {
    this.productService.addProductMaterial(this.product.id, this.newMaterial);
  }

  backToProducts() {
    this.router.navigate([`/admin`]);
  }
}
