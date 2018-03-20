import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Input } from '@angular/core';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { AppState, rootReducers, productsReducer, ProductsState, initialProductsState } from '../../+store';
import * as ProductsActions from './../../+store/actions/products.actions';

import { ProductListComponent } from './product-list.component';
import { Product } from '../product/product.model';

@Component({ selector: 'app-product', template: '' })
export class AppProductStubComponent {
  @Input() product: Product;
}

@Component({ selector: 'app-cart-list', template: '' })
export class AppCartListStubComponent { }

const initState = initialProductsState;

let component: ProductListComponent;
let fixture: ComponentFixture<ProductListComponent>;
let de: DebugElement;
let el: HTMLElement;
let store: Store<AppState>;

describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(rootReducers),
        StoreModule.forFeature(
          'products',
          productsReducer,
          { initialState: <ProductsState>initState },
        ),
      ],
      declarations: [
        ProductListComponent,
        AppProductStubComponent,
        AppCartListStubComponent,
      ],
    })
    .compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should contain a Products title', () => {
    de = fixture.debugElement.query(By.css('.title'));
    el = de.nativeElement;

    expect(el.innerText).toBe('Products');
  });

  it('should contain a table header block with nine spans', () => {
    de = fixture.debugElement.query(By.css('header'));
    el = de.nativeElement;

    expect(el.className).toBe('product-list__header');
    expect(el.childElementCount).toBe(9);
    expect(el.querySelectorAll('span').length).toBe(9);

    expect(el.querySelectorAll('.product-list__name').length).toBe(1);
    expect(el.querySelectorAll('.product-list__description').length).toBe(1);
    expect(el.querySelectorAll('.product-list__category').length).toBe(1);
    expect(el.querySelectorAll('.product-list__materials').length).toBe(1);
    expect(el.querySelectorAll('.product-list__alternatives').length).toBe(1);
    expect(el.querySelectorAll('.product-list__availability').length).toBe(1);
    expect(el.querySelectorAll('.product-list__price').length).toBe(1);
    expect(el.querySelectorAll('.product-list__quantity').length).toBe(1);
    expect(el.querySelectorAll('.product-list__button').length).toBe(1);

    expect(el.querySelectorAll('.sortable').length).toBe(5);
  });

  it('should dispatch get products action on init', () => {
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new ProductsActions.GetProducts());
  });

  it('should subscribe to sorting key and order on init', () => {
    fixture.detectChanges();

    expect(component.key).toBe('id');
    expect(component.order).toBe('desc');
  });

  describe('sortProducts() method', () => {
    it('should toggle order if key is not changed', () => {
      fixture.detectChanges();

      expect(component.order).toBe('desc');
      component.sortProducts('id');

      expect(store.dispatch).toHaveBeenCalledWith(new ProductsActions.SetSortKey('id'));
      expect(store.dispatch).toHaveBeenCalledWith(new ProductsActions.SetSortOrder('asc'));

      expect(component.order).toBe('asc');
    });

    it('should reset order to default if key changed', () => {
      fixture.detectChanges();

      expect(component.order).toBe('desc');

      component.sortProducts('name');

      expect(store.dispatch).toHaveBeenCalledWith(new ProductsActions.SetSortKey('name'));
      expect(store.dispatch).toHaveBeenCalledWith(new ProductsActions.SetSortOrder('desc'));

      expect(component.order).toBe('desc');
    });
  });

});
