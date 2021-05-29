// import { Cart } from '../../interfaces';

export enum PRODUCT_ACTION {
    add = 'cart/add',
    set = 'cart/set',
    delete = 'cart/delete'
}

export interface ProductAction {
    type: PRODUCT_ACTION,
    payload?: any,
}