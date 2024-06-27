import { img } from "./img";

export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  promotionalValue: number;
  imgs: img[]
  // amount?: number;
  // edit?: boolean;
}
