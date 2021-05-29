import { createStore } from 'redux';
import { productReducer } from './product-reducer';

export const productStore = createStore(productReducer);