export interface User {
    address?: {
        cep: string,
        city: string,
        extra?: string,
        neighborhood: string,
        number: number,
        state: string
    }
    password?: string | unknown
    admin: boolean
    email: string
    oldEmail?: string
    name: string
    phone: string
    stripe_id?: string
}
