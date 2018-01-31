import { Category } from './product.enum';

export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public isAvailable: boolean,
    public category: Category,
    public ingredients?: Array<string>,
    public equivalents?: Array<number>,   // equivalent IDs
  ) {
    this.ingredients = ingredients || [];
    this.equivalents = equivalents || [];
  }
}
