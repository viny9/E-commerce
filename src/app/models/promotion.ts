import { Product } from "./product";

export interface Promotion {
    name: string,
    start: string,
    end: string,
    description: string,
    products: Product[]
}
