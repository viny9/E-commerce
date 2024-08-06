import { Product } from "./Product";

export interface List {
  id?: string,
  userId: string,
  products: Product[]
}
