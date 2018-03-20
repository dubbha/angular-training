import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Input } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppState, rootReducers, productsReducer, ProductsState, initialProductsState } from '../../+store';
import * as ProductsActions from './../../+store/actions/products.actions';

import { RouterStub, ActivatedRouteStub } from './../../testing-helpers';

import { ProductCardComponent } from './product-card.component';
import { Product } from '../product/product.model';
import { CartService } from '../../cart/cart.service';
import { LocalStorageService, WindowRefService } from '../../core/services';

@Component({ selector: 'app-cart-list', template: '' })
export class AppCartListStubComponent { }

const initState = initialProductsState;

const product = { id: 42, name: 'olive', price: 10, isAvailable: true, description: null, category: null };

let component: ProductCardComponent;
let fixture: ComponentFixture<ProductCardComponent>;
let de: DebugElement;
let el: HTMLElement;
let store: Store<AppState>;
let cartService: CartService;
let activatedRouteStub: ActivatedRouteStub;

xdescribe('ProductCardComponent', () => {

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
        ProductCardComponent,
        AppCartListStubComponent,
      ],
      providers: [
        CartService,
        LocalStorageService,
        WindowRefService,
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
        { provide: Router, useValue: RouterStub },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    console.log(store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();

    cartService = fixture.debugElement.injector.get(CartService);
    spyOn(cartService, 'addToCart').and.callThrough();

    activatedRouteStub = new ActivatedRouteStub();
  });

  it('should dispatch get products action on init', () => {
    activatedRouteStub.testParams = { id: product.id };

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new ProductsActions.GetProducts());
  });

});
