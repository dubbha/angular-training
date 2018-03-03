import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Product } from '../../products/product/product.model';
import { Category } from '../../products/product/product.enum';
import { ProductService } from '../../products/products.service';
import { ModalService } from '../../shared/services';

@Component({
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.sass']
})
export class ProductEditorComponent implements OnInit, OnDestroy {
  sub: Subscription;
  updatedProduct: Product;
  otherProducts: Array<Product>;
  categories: Array<string>;
  newMaterial = '';
  error = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productService.getProductById(+params.id)
        .then(product => {
          this.updatedProduct = { ...product };
          this.productService.getProducts()
            .then(products => this.otherProducts = products.filter(p => p.id !== +params.id));
        });
    });
    this.categories = Object.keys(Category).map(key => Category[key]);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getAlternative(id) {
    return this.productService.getProductById(id);
  }

  removeMaterial(material: string): void {
    this.updatedProduct.materials = this.updatedProduct.materials.filter(m => m !== material);
  }

  addMaterial(): void {
    if (this.newMaterial && !this.updatedProduct.materials.includes(this.newMaterial)) {
      this.updatedProduct.materials.push(this.newMaterial);
    }
  }

  backToProducts() {
    this.router.navigate(['/admin']);
  }

  save() {
    this.modalService.confirm('Save changes?', {
      style: 'success',
      callback: () => {
        this.sub = this.productService.updateProduct(this.updatedProduct)
          .subscribe(
            () => this.router.navigate(['/admin']),
            err => this.error = err.message,
          );
      }
    });
  }

  delete() {
    this.modalService.confirm('Are you sure you want to delete the product?', {
      style: 'warn',
      callback: () => {
        this.sub = this.productService.removeProduct(this.updatedProduct.id)
          .subscribe(
            () => this.router.navigate(['/admin']),
            err => this.error = err.message,
          );
      }
    });
  }
}
