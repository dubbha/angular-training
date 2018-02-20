import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../../products/product/product.model';
import { Category } from '../../products/product/product.enum';
import { ProductService } from '../../products/products.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.sass']
})
export class ProductCreatorComponent implements OnInit {
  product: Product;
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
      this.product = new Product(null, '', '', 1, true, null);
      this.otherProducts = this.productService.getProducts()
        .filter(p => p.id !== this.product.id);  // would appear in the list right after save
    });
    this.categories = Object.keys(Category).map(key => Category[key]);
  }

  removeMaterial(material: string): void {
    this.product.materials = this.product.materials.filter(m => m !== material);
  }

  addMaterial(event): void {
    event.preventDefault();
    if (this.newMaterial && !this.product.materials.includes(this.newMaterial)) {
      this.product.materials.push(this.newMaterial);
    }
  }

  submit(event, form) {
    event.preventDefault();
    if (form.valid) {
      this.modalService.confirm('Save changes?', {
        style: 'success',
        callback: () => {
          this.productService.addProduct(this.product);
          this.backToProducts();
        }
      });
    }
  }

  backToProducts() {
    this.router.navigate(['/admin']);
  }
}
