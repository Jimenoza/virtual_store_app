// import { Cart } from '../../interfaces';
import { Product } from '../../interfaces';

export enum PRODUCT_ACTION {
    set = 'product/set',
    delete = 'product/delete'
}

export interface ProductsIndex {
    current_page: number,
    last_page: number,
    next_page_url?: string,
    prev_page_url?: string,
    products: Product[]
}

export interface ProductAction {
    type: PRODUCT_ACTION,
    payload?: ProductsIndex,
}