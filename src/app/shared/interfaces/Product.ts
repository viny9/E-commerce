import { Img } from './Img';

export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  promotionalValue: number;
  imgs: Img[];
}
