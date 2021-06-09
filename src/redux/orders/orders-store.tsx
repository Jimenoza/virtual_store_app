import { createStore } from 'redux';
import { ordersReducer } from './orders-reducer';

export const ordersStore = createStore(ordersReducer);