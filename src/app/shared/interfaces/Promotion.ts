import { Product } from './Product';

export interface Promotion {
  id?: string;
  name: string;
  start: string;
  end: string;
  description: string;
  products: Product[];
}
