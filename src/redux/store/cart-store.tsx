import { createStore } from 'redux';
import { cartReducer } from '../reducers/cart';

export var cartStore = createStore(cartReducer);