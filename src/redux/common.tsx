export enum CART_ACTION {
    add = 'cart/add',
    set = 'cart/set'
}

export interface CartAction {
    type: CART_ACTION,
    payload?: any,
}