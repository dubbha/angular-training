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
import { ModalService } from '../../shared/services/modal.service';
import { AutoUnsubscribe } from '../../core/decorators';

@Component({
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.sass']
})
@AutoUnsubscribe()
export class ProductCreatorComponent implements OnInit {
  product: Product;
  otherProducts: Array<Product>;
  categories: Array<string>;
  newMaterial: string;
  productsError$: Store<string>;

  private sub: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private productService: ProductService,
    private modalService: ModalService,
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.productsError$ = this.store.select(getProductsError);
    this.store.dispatch(new ProductsActions.GetProducts());
    this.sub.add(this.store.select(getProductsData).subscribe(products => this.otherProducts = products));

    this.product = new Product(null, '', '', 1, true, null);
    this.categories = Object.keys(Category).map(key => Category[key]);
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
        callback: () => this.store.dispatch(new ProductsActions.AddProduct(this.product))
      });
    }
  }

  backToProducts() {
    this.store.dispatch(new RouterActions.Go({ path: ['/admin'] }));
  }
}
