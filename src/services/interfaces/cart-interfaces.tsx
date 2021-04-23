import { Response } from '../common/interfaces';
import { Product } from './product-interfaces';

export interface Cart{
    total: number,
    cart: Product[]
}

export interface CartResponse extends Response{
    data: Cart
}
