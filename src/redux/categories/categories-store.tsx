import { createStore } from 'redux';
import { categoriesReducer } from './categories-reducer';

export const categoriesStore = createStore(categoriesReducer);