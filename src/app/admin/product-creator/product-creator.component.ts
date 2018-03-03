import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Product } from '../../products/product/product.model';
import { Category } from '../../products/product/product.enum';
import { ProductService } from '../../products/products.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.sass']
})
export class ProductCreatorComponent implements OnInit, OnDestroy {
  product: Product;
  otherProducts: Array<Product>;
  categories: Array<string>;
  newMaterial: string;
  sub: Subscription;
  error: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.product = new Product(null, '', '', 1, true, null);
      this.productService.getProducts()
        .then(products => this.otherProducts = products.filter(p => p.id !== this.product.id));
    });
    this.categories = Object.keys(Category).map(key => Category[key]);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  removeMaterial(material: string): void {
    this.product.materials = this.product.materials.filter(m => m !== material);
  }

  addMaterial(): void {
    if (this.newMaterial && !this.product.materials.includes(this.newMaterial)) {
      this.product.materials.push(this.newMaterial);
    }
  }

  preventEnter(event) {
    return event.keyCode !== 13;
  }

  save(form) {
    if (form.valid) {
      this.modalService.confirm('Save changes?', {
        style: 'success',
        callback: () => {
          this.sub = this.productService.addProduct(this.product)
            .subscribe(
              () => this.backToProducts(),
              err => {
                console.error(err);
                this.error = err.message;
              }
            );
        }
      });
    }
  }

  backToProducts() {
    this.router.navigate(['/admin']);
  }
}
