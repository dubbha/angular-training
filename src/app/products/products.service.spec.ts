import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { AppState, rootReducers } from '../+store';

import { ProductService } from './products.service';
import { Product } from './product/product.model';

const initState = {
  appSettings: {
    settings: {
      title: 'Test Title',
      version: 1,
      cacheTimeToLiveSeconds: 300,
      apiBaseUrl: 'http://fake.domain:1234/api',
    }
  }
};

describe('ProductService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          rootReducers,
          { initialState: <Partial<AppState>>initState },
        ),
        HttpClientTestingModule,
      ],
      providers: [ProductService],
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should set apiBaseUrl from appSettings in constructor',
    inject([HttpTestingController, ProductService],
      (httpMock: HttpTestingController, productService: ProductService) => {

      expect(productService.apiBaseUrl).toBe(initState.appSettings.settings.apiBaseUrl);

  }));

  describe('getProducts() method', () => {
    it('should get products from server and save the data to local cache',
      inject([HttpTestingController, ProductService],
        (httpMock: HttpTestingController, productService: ProductService) => {

        const common = { description: null, category: null, alternatives: [] };  // common fields
        const mockProducts: Product[]  = [
          { name: 'olive', price: 10, isAvailable: true, id: 1, ...common },
          { name: 'banana', price: 5, isAvailable: false, id: 2, ...common },
          { name: 'asbestos', price: 90, isAvailable: true, id: 3, ...common },
        ];
        const mockCachedProducts = mockProducts.map(p => ({ ...p, alternativesWithNames: [] }));

        productService.getProducts()
          .then(products => {
            expect(products).toEqual(mockProducts);
            expect(productService.productsCache).toEqual(mockCachedProducts);
          });

        const mockReq = httpMock.expectOne(`${initState.appSettings.settings.apiBaseUrl}/products`);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        expect(mockReq.request.method).toEqual('GET');

        mockReq.flush(mockProducts);
    }));

    it('should get products from cache if cache is available',
      inject([HttpTestingController, ProductService],
        (httpMock: HttpTestingController, productService: ProductService) => {


        const common = { description: null, category: null, alternatives: [] };  // common fields
        const cacheCommon = { ...common, alternativesWithNames: [] };
        const mockProductsCache = [
          { name: 'cachedOlive', price: 10, isAvailable: true, id: 1, ...common },
          { name: 'cachedBanana', price: 5, isAvailable: false, id: 2, ...common },
          { name: 'cachedAsbestos', price: 90, isAvailable: true, id: 3, ...common },
        ];

        productService.productsCache = mockProductsCache;

        productService.getProducts()
          .then(products => {
            expect(products).toEqual(mockProductsCache);
          });

        httpMock.expectNone(`${initState.appSettings.settings.apiBaseUrl}/products`);
    }));
  });

  describe('getProducts() method', () => {
    it('should get product by id from server if no cache is available',
      inject([HttpTestingController, ProductService],
        (httpMock: HttpTestingController, productService: ProductService) => {

        const common = { description: null, category: null, alternatives: [] };
        const mockProducts: Product[]  = [
          { name: 'olive', price: 10, isAvailable: true, id: 1, ...common },
          { name: 'banana', price: 5, isAvailable: false, id: 2, ...common },
          { name: 'asbestos', price: 90, isAvailable: true, id: 3, ...common },
        ];
        const cacheCommon = { ...common, alternativesWithNames: [] };
        const mockCachedProducts = mockProducts.map(p => ({ ...p, alternativesWithNames: [] }));

        productService.getProductById(2)
          .then(product => {
            expect(product).toEqual({ name: 'banana', price: 5, isAvailable: false, id: 2, ...cacheCommon });
          });

        const mockReq = httpMock.expectOne(`${initState.appSettings.settings.apiBaseUrl}/products`);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        expect(mockReq.request.method).toEqual('GET');

        mockReq.flush(mockProducts);
    }));

    it('should get products by id from cache if cache is available',
      inject([HttpTestingController, ProductService],
        (httpMock: HttpTestingController, productService: ProductService) => {

        const common = { description: null, category: null, alternatives: [] };
        const cacheCommon = { ...common, alternativesWithNames: [] };
        const mockProductsCache = [
          { name: 'cachedOlive', price: 10, isAvailable: true, id: 1, ...cacheCommon },
          { name: 'cachedBanana', price: 5, isAvailable: false, id: 2, ...cacheCommon },
          { name: 'cachedAsbestos', price: 90, isAvailable: true, id: 3, ...cacheCommon },
        ];

        productService.productsCache = mockProductsCache;

        productService.getProductById(2)
          .then(product => {
            expect(product).toEqual({ name: 'cachedBanana', price: 5, isAvailable: false, id: 2, ...cacheCommon });
          });

        httpMock.expectNone(`${initState.appSettings.settings.apiBaseUrl}/products`);
    }));
  });

  describe('addProduct() method', () => {
    it('should add product sending POST to server and pushing to cache on success',
      inject([HttpTestingController, ProductService],
        (httpMock: HttpTestingController, productService: ProductService) => {

        const common = { description: null, category: null, alternatives: [] };
        const cacheCommon = { ...common, alternativesWithNames: [] };
        const cacheProduct  = { name: 'olive', price: 10, isAvailable: true, id: null, ...cacheCommon };
        const serverProduct  = { name: 'olive', price: 10, isAvailable: true, id: null, ...common };

        productService.addProduct(cacheProduct)
          .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                expect(event.body).toEqual(cacheProduct);
            }
          });

        const mockReq = httpMock.expectOne(`${initState.appSettings.settings.apiBaseUrl}/products`);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        expect(mockReq.request.method).toEqual('POST');
        expect(mockReq.request.body).toEqual(serverProduct);

        mockReq.flush(cacheProduct);
    }));
  });

  describe('removeProduct() method', () => {
    it('should remove product sending DELETE to server and removing from cache on success',
      inject([HttpTestingController, ProductService],
        (httpMock: HttpTestingController, productService: ProductService) => {

        const common = { description: null, category: null, alternatives: [] };  // common fields
        const cacheCommon = { ...common, alternativesWithNames: [] };
        const mockProductsCache = [
          { name: 'cachedOlive', price: 10, isAvailable: true, id: 1, ...common },
          { name: 'cachedBanana', price: 5, isAvailable: false, id: 2, ...common },
          { name: 'cachedAsbestos', price: 90, isAvailable: true, id: 3, ...common },
        ];

        productService.productsCache = mockProductsCache;

        productService.removeProduct(2)
          .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                expect(productService.productsCache.length).toBe(2);
                expect(productService.productsCache).not.toContain({
                  name: 'cachedBanana', price: 5, isAvailable: false, id: 2, ...common
                });
            }
          });

        const mockReq = httpMock.expectOne(`${initState.appSettings.settings.apiBaseUrl}/products/2`);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        expect(mockReq.request.method).toEqual('DELETE');

        mockReq.flush({});
    }));
  });

  describe('updateProduct() method', () => {
    it('should update product sending PUT to server and updating the cache on success',
      inject([HttpTestingController, ProductService],
        (httpMock: HttpTestingController, productService: ProductService) => {

        const common = { description: null, category: null, alternatives: [] };  // common fields
        const cacheCommon = { ...common, alternativesWithNames: [] };
        const mockProductsCache = [
          { name: 'cachedOlive', price: 10, isAvailable: true, id: 1, ...common },
          { name: 'cachedBanana', price: 5, isAvailable: false, id: 2, ...common },
          { name: 'cachedAsbestos', price: 90, isAvailable: true, id: 3, ...common },
        ];

        productService.productsCache = mockProductsCache;

        const updatedProduct = { name: 'updatedBanana', price: 25, isAvailable: false, id: 2, ...common };

        productService.updateProduct(updatedProduct)
          .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                expect(event.body).toEqual(updatedProduct);
                expect(productService.productsCache).toEqual([
                  { name: 'cachedOlive', price: 10, isAvailable: true, id: 1, ...common },
                  { name: 'updatedBanana', price: 25, isAvailable: false, id: 2, ...common },
                  { name: 'cachedAsbestos', price: 90, isAvailable: true, id: 3, ...common },
                ]);
            }
          });

        const mockReq = httpMock.expectOne(`${initState.appSettings.settings.apiBaseUrl}/products/2`);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        expect(mockReq.request.method).toEqual('PUT');

        mockReq.flush(updatedProduct);
    }));
  });

  describe('patchProduct() method', () => {
    it('should send PATCH to server with id and partial of the product to be updated',
      inject([HttpTestingController, ProductService],
        (httpMock: HttpTestingController, productService: ProductService) => {

        const partial = { name: 'updatedBanana', price: 25 };

        productService.patchProduct(2, partial)
          .subscribe();

        const mockReq = httpMock.expectOne(`${initState.appSettings.settings.apiBaseUrl}/products/2`);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        expect(mockReq.request.method).toEqual('PATCH');
        expect(mockReq.request.body).toEqual(partial);

        mockReq.flush({});
    }));
  });

});
