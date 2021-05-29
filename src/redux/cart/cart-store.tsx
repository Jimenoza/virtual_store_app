import { createStore } from 'redux';
import { cartPersitedReducer } from './cart-reducer';
import { persistStore } from 'redux-persist';

export const cartStore = createStore(cartPersitedReducer);
export const cartPersitor = persistStore(cartStore)