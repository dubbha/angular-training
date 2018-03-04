import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { tap, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { AppSettingsService } from '../core/services';
import { Product } from './product/product.model';
import { Category } from './product/product.enum';
import { AppState } from '../+store';

@Injectable()
export class ProductService {
  productsCache: Array<Product>;
  cacheTimeToLiveSeconds: number;
  productsCacheExpiryTime: number;
  apiBaseUrl: string;
  apiEndpoint = 'products';

  constructor(
    private http: HttpClient,
    private appSettingsService: AppSettingsService,
    private store: Store<AppState>,
  ) {
    // TODO Move to selectors, won't be availbale when effects initialized
    // this.apiBaseUrl = this.appSettingsService.appSettings.apiBaseUrl;
    // this.cacheTimeToLiveSeconds = this.appSettingsService.appSettings.cacheTimeToLiveSeconds;
    this.store.select('appSettings')
      .pipe(tap(appSettings => {
        console.log('appSettings', appSettings);
        if (appSettings.settings) {
          this.apiBaseUrl = appSettings.settings.apiBaseUrl;
        }
      }))
      .subscribe();
  }

  getProducts(): Promise<Array<Product>> {
    if (!this.productsCache || Date.now() > this.productsCacheExpiryTime) {
      return this.http.get(`${this.apiBaseUrl}/${this.apiEndpoint}`)
        .toPromise()
        .then(data => {
          const castedData = <Array<Product>>data;

          const transformedData = castedData.map(product => {
            product.alternativesWithNames = product.alternatives.map(altId => ({
              id: altId,
              name: castedData.find(p => p.id === altId).name
            }));

            return product;
          });

          this.productsCache = transformedData;
          this.productsCacheExpiryTime = Date.now() + this.cacheTimeToLiveSeconds * 1000;
          return <Array<Product>>data;
        });
    } else {
      return Promise.resolve(this.productsCache);
    }
  }

  getProductById(id): Promise<Product> {
    return this.getProducts()
      .then(products => products.find(p => p.id === id));
  }

  addProduct(product: Product): Observable<any> {
    delete product.alternativesWithNames;

    return this.http.post(`${this.apiBaseUrl}/${this.apiEndpoint}`, product)
      .pipe(
        tap((createdProduct) => {
          const castedProduct = <Product>createdProduct;

          castedProduct.alternativesWithNames = castedProduct.alternatives.map(altId => ({
            id: altId,
            name: this.productsCache.find(p => p.id === altId).name
          }));

          this.productsCache.push(castedProduct);
        }),
        catchError(err => Observable.throw(err)),
      );
  }

  removeProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/${this.apiEndpoint}/${id}`)
      .pipe(
        tap(() => {
          this.productsCache = this.productsCache
            .filter(product => product.id !== id)
            .map(product => {
              if (product.alternatives.includes(id)) {
                product.alternatives = product.alternatives.filter(e => e !== id);
                product.alternativesWithNames = product.alternativesWithNames
                  .reduce((aggr, cur) => {
                    if (cur.id !== id) {
                      aggr.push(cur);
                    }
                    return aggr;
                  }, []);
                this.patchProduct(
                  product.id,
                  { alternatives: product.alternatives },
                ).subscribe();  // https://stackoverflow.com/a/41381265/8861667
              }
              return product;
            });
        }),
        catchError(err => Observable.throw(err)),
      );
  }

  updateProduct(updatedProduct: Product): Observable<any> {
    const dbProduct = { ...updatedProduct };
    delete dbProduct.alternativesWithNames;

    return this.http.put(`${this.apiBaseUrl}/${this.apiEndpoint}/${dbProduct.id}`, dbProduct)
      .pipe(
        tap(() => {
          this.productsCache = this.productsCache
            .map(product => {
              // Re-create alternativesWithNames of the updated product, in case alternatives were updated
              if (product.id === dbProduct.id) {
                dbProduct.alternativesWithNames = dbProduct.alternatives.map(altId => ({
                  id: altId,
                  name: this.productsCache.find(p => p.id === altId).name
                }));

                return dbProduct;
              }

              // If we changed the name of the product, we need to update alternativesWithNames of others
              if (product.alternatives.includes(dbProduct.id)) {
                product.alternativesWithNames
                  .find(alt => alt.id === dbProduct.id)
                  .name = dbProduct.name;
              }
              return product;
            });
        }),
        catchError(err => Observable.throw(err)),
      );
  }

  patchProduct(id: number, partial: any): Observable<any> {
    return this.http.patch(`${this.apiBaseUrl}/${this.apiEndpoint}/${id}`, partial);
  }
}
