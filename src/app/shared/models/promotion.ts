import { Product } from './product';

export interface Promotion {
  id: string;
  name: string;
  start: string;
  end: string;
  description: string;
  products: Product[];
}
