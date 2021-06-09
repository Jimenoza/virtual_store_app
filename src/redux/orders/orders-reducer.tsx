import { OrderResponse, Order } from '../../interfaces';
import { OrderAction, OrderState } from './interfaces';

const INITIAL_STATE : OrderState = {
  orders : []
}

export function ordersReducer(state:OrderState = INITIAL_STATE, action: OrderAction) {
  switch (action.type) {
    case 'order/set': {
      return {...state, ...action.payload};
    }
    case 'order/delete': {
      return INITIAL_STATE;
    }
    default:{
      return {...state};
    }
  }
}