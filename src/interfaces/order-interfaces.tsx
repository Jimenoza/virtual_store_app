import { Response } from './common';
import { Product } from './product-interfaces';

export interface Order {
    id : number,
    total: number,
    date: string,
    address: string,
    user_id: number
}

export interface OrderResponse extends Response {
    data: Order[]
}

export interface OrderDetailedResponse extends Response {
    data: Product[]
}