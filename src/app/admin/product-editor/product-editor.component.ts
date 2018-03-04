import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState, getProductsData, getProductsError } from './../../+store';
import * as ProductsActions from './../../+store/actions/products.actions';
import * as RouterActions from './../../+store/actions/router.actions';

import { Subscription } from 'rxjs/Subscription';

import { Product } from '../../products/product/product.model';
import { Category } from '../../products/product/product.enum';
import { ProductService } from '../../products/products.service';
import { ModalService } from '../../shared/services';
import { AutoUnsubscribe } from '../../core/decorators';

@Component({
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.sass']
})
@AutoUnsubscribe()
export class ProductEditorComponent implements OnInit {
  sub: Subscription;
  updatedProduct: Product;
  otherProducts: Array<Product>;
  categories: Array<string>;
  newMaterial = '';
  error = '';

  constructor(
    private store: Store<AppState>,
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
    this.store.dispatch(new RouterActions.Go({ path: ['/admin'] }));
  }

  save() {
    this.modalService.confirm('Save changes?', {
      style: 'success',
      callback: () => this.store.dispatch(new ProductsActions.UpdateProduct(this.updatedProduct)),
    });
  }

  delete() {
    this.modalService.confirm('Are you sure you want to delete the product?', {
      style: 'warn',
      callback: () => this.store.dispatch(new ProductsActions.RemoveProduct(this.updatedProduct.id)),
    });
  }
}
