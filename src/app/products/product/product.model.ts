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
    public alternatives?: Array<number>,   // alternative IDs
    public alternativesWithNames?: Array<{ id: number, name: string }>, // alternative IDs with names
  ) {
    this.materials = materials || [];
    this.alternatives = alternatives || [];
    this.alternativesWithNames = alternativesWithNames || [];
  }
}
