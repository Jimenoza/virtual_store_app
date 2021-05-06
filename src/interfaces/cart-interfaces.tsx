import { Response } from './common';
import { Product } from './product-interfaces';

export interface Cart{
    total: number,
    cart: Product[]
}

export interface CartResponse extends Response{
    data: Cart
}
