import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  productsError$: Store<string>;
  form: FormGroup;
  newMaterialSubForm: FormGroup;

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

    this.form = new FormGroup({
      name: new FormControl(this.product.name, Validators.required),
      description: new FormControl(this.product.description, Validators.required),
      category: new FormControl(this.product.category, Validators.required),
      price: new FormControl(this.product.price, [Validators.required, Validators.min(1), Validators.max(999999)]),
      isAvailable: new FormControl(this.product.isAvailable),
      alternatives: new FormControl(this.product.alternatives),
    });

    this.newMaterialSubForm = new FormGroup({
      newMaterial: new FormControl(),
    });
  }

  removeMaterial(material: string): void {
    this.product.materials = this.product.materials.filter(m => m !== material);
  }

  addMaterial(): void {
    const newMaterial = this.newMaterialSubForm.get('newMaterial').value;
    if (newMaterial && !this.product.materials.includes(newMaterial)) {
      this.product.materials.push(newMaterial);
    }
  }

  save() {
    if (this.form.valid) {
      console.log({ ...this.product, ...this.form.value });
      this.modalService.confirm('Save changes?', {
        style: 'success',
        callback: () => {
          this.store.dispatch(new ProductsActions.AddProduct({
            ...this.product,
            ...this.form.value,
          }));
        }
      });
    }
  }

  backToProducts() {
    this.store.dispatch(new RouterActions.Go({ path: ['/admin'] }));
  }
}
