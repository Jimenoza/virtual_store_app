import { CartAction } from '../common';

import { persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cart } from '../../interfaces';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

function cartReducer(state:Cart = { cart : [], total : 0}, action: CartAction) {
  // console.log(state);
  // console.log(action);
    switch (action.type) {
      case 'cart/set': {
        // console.log(`set with ${action.type}`);
        return {...state, ...action.payload};
      }
      case 'cart/delete':{
        // console.log(`delete with ${action.type}`);
        return { cart : [], total : 0};
      }
      default:{
        // console.log(`default with ${action.type}`)
        return {...state};
      }
    }
}

export const cartPersitedReducer = persistReducer(persistConfig,cartReducer);