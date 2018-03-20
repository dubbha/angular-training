import { SortProductsPipe } from './sort-products.pipe';
import { Product } from '../product/product.model';

describe('SortProductsPipe', () => {
  const pipe = new SortProductsPipe();

  const common = { description: null, category: null };  // common fields
  const products: Product[]  = [
    { name: 'olive', price: 10, isAvailable: true, id: 1, ...common },
    { name: 'banana', price: 5, isAvailable: false, id: 2, ...common },
    { name: 'asbestos', price: 90, isAvailable: true, id: 3, ...common },
  ];

  it('should sort by string key ascending', () => {
    expect(pipe.transform(products, 'name', 'asc')).toEqual([
      { name: 'asbestos', price: 90, isAvailable: true, id: 3, ...common },
      { name: 'banana', price: 5, isAvailable: false, id: 2, ...common },
      { name: 'olive', price: 10, isAvailable: true, id: 1, ...common },
    ]);
  });

  it('should sort by string key descending', () => {
    expect(pipe.transform(products, 'name', 'desc')).toEqual([
      { name: 'olive', price: 10, isAvailable: true, id: 1, ...common },
      { name: 'banana', price: 5, isAvailable: false, id: 2, ...common },
      { name: 'asbestos', price: 90, isAvailable: true, id: 3, ...common },
    ]);
  });

  it('should sort by numeric key ascending', () => {
    expect(pipe.transform(products, 'price', 'asc')).toEqual([
      { name: 'banana', price: 5, isAvailable: false, id: 2, ...common },
      { name: 'olive', price: 10, isAvailable: true, id: 1, ...common },
      { name: 'asbestos', price: 90, isAvailable: true, id: 3, ...common },
    ]);
  });

  it('should sort by numeric key descending', () => {
    expect(pipe.transform(products, 'price', 'desc')).toEqual([
      { name: 'asbestos', price: 90, isAvailable: true, id: 3, ...common },
      { name: 'olive', price: 10, isAvailable: true, id: 1, ...common },
      { name: 'banana', price: 5, isAvailable: false, id: 2, ...common },
    ]);
  });

  it('should sort by boolean key ascending', () => {
    expect(pipe.transform(products, 'isAvailable', 'asc')).toEqual([
      { name: 'banana', price: 5, isAvailable: false, id: 2, ...common },
      { name: 'asbestos', price: 90, isAvailable: true, id: 3, ...common },
      { name: 'olive', price: 10, isAvailable: true, id: 1, ...common },
    ]);
  });

  it('should sort by boolean key descending', () => {
    expect(pipe.transform(products, 'isAvailable', 'desc')).toEqual([
      { name: 'olive', price: 10, isAvailable: true, id: 1, ...common },
      { name: 'asbestos', price: 90, isAvailable: true, id: 3, ...common },
      { name: 'banana', price: 5, isAvailable: false, id: 2, ...common },
    ]);
  });

  it('should sort in descending order by default', () => {
    expect(pipe.transform(products, 'name')).toEqual([
      { name: 'olive', price: 10, isAvailable: true, id: 1, ...common },
      { name: 'banana', price: 5, isAvailable: false, id: 2, ...common },
      { name: 'asbestos', price: 90, isAvailable: true, id: 3, ...common },
    ]);
  });

  it('should return products unsorted if key is of another type', () => {
    expect(pipe.transform(products, 'category')).toEqual(products);
  });
});
