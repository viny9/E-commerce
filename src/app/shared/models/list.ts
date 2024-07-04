import { Product } from "./product";

export interface List {
  id: string,
  userId: string,
  products: Product[]
}
