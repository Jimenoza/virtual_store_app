// import { Cart } from '../../interfaces';
import { Order } from '../../interfaces';

export interface OrderState {
    orders : Order[]
}

export enum ORDER_ACTION {
    set = 'order/set',
    delete = 'order/delete'
}

export interface OrderAction {
    type: ORDER_ACTION,
    payload?: OrderState,
}