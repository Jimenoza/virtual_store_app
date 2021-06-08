import { CartAction } from './interfaces';
import { Cart } from '../../interfaces';

const INITIAL_STATE: Cart = {
  cart : [],
  total : 0,
}

export function cartReducer(state:Cart = INITIAL_STATE, action: CartAction) {
  // console.log(state);
  // console.log(action);
    switch (action.type) {
      case 'cart/set': {
        // console.log(`set with ${action.type}`);
        return {...state, ...action.payload};
      }
      case 'cart/delete':{
        // console.log(`delete with ${action.type}`);
        return INITIAL_STATE;
      }
      default:{
        // console.log(`default with ${action.type}`)
        return {...state};
      }
    }
}

// export const cartPersitedReducer = persistReducer(persistConfig,cartReducer);