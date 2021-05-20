import { CartAction } from '../common';

export function cartReducer(state = {}, action: CartAction) {
    switch (action.type) {
        case 'cart/set':
          return { ...state }
        default:
          return state
    }
}