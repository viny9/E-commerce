export interface Product {
    id?: string
    amount?: number
    name: string
    price: number
    imgs: {
        name: string
        order: number
        size: string
        url: string
    }[]
    category: string
    promotionInfos?: {
        name: string
        promotionPrice: number
        percentage: number
    }
}
