import { Category } from './product.enum';

export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public isAvailable: boolean,
    public category: Category,
    public materials?: Array<string>,
    public equivalents?: Array<number>,   // equivalent IDs
  ) {
    this.materials = materials || [];
    this.equivalents = equivalents || [];
  }
}
