import { createStore } from 'redux';
import { productReducer } from './product-reducer';

export const productStore = createStore(productReducer);
export const productSearchStore = createStore(productReducer);
export const productsCategoryStore = createStore(productReducer);