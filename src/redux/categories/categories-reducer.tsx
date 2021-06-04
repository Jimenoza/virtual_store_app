import { categoryAction, CategoriesIndex } from './interfaces';
import { Category, Product } from '../../interfaces';

const INITIAL_STATE: CategoriesIndex = {
  categories : []
}

export function categoriesReducer(state: CategoriesIndex = INITIAL_STATE, action: categoryAction) {
      switch (action.type) {
        case 'category/set': {
          return {...state, ...action.payload};
        }
        case 'category/delete': {
          return INITIAL_STATE;
        }
        default:{
          return {...state};
        }
      }
  }