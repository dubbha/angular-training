import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../../products/product/product.model';
import { Category } from '../../products/product/product.enum';
import { ProductService } from '../../products/products.service';
import { ModalService } from '../../shared/services';

@Component({
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.sass']
})
export class ProductEditorComponent implements OnInit {
  updatedProduct: Product;
  otherProducts: Array<Product>;
  categories: Array<string>;
  newMaterial: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.updatedProduct = { ...this.productService.getProductById(+params.id) };
      this.otherProducts = this.productService.getProducts()
        .filter(product => product.id !== +params.id);
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
    this.updatedProduct.materials.push(this.newMaterial);
  }

  backToProducts() {
    this.router.navigate(['/admin']);
  }

  save() {
    this.modalService.confirm('Save changes?', {
      style: 'success',
      callback: () => {
        this.productService.updateProduct(this.updatedProduct);
        this.router.navigate(['/admin']);
      }
    });
  }

  delete() {
    this.modalService.confirm('Are you sure you want to delete the product?', {
      style: 'warn',
      callback: () => {
        this.productService.removeProduct(this.updatedProduct.id);
        this.router.navigate(['/admin']);
      }
    });
  }
}
