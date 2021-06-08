import { Cart } from '../../interfaces';

export interface CartStateProps {
    state: Cart,
}

export enum CART_ACTION {
    add = 'cart/add',
    set = 'cart/set',
    delete = 'cart/delete'
}

export interface CartAction {
    type: CART_ACTION,
    payload?: Cart,
}