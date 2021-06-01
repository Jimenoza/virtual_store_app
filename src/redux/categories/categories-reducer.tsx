import { categoryAction, CategoriesIndex } from './interfaces';
import { Category, Product } from '../../interfaces';

const INITIAL_STATE: CategoriesIndex = {
  products : {
    current_page: 0,
    last_page: 0,
    next_page_url: undefined,
    prev_page_url: undefined,
    products: []
  },
  categories : []
}

export function categoriesReducer(state: CategoriesIndex = INITIAL_STATE, action: categoryAction) {
      switch (action.type) {
        case 'category/set': {
          return {...state, ...action.payload};
        }
        case 'category/products': {
          return {...state, products : action.payload?.products};
        }
        case 'category/categories' : {
          return {...state, categories : action.payload?.categories};
        }
        case 'category/delete': {
          return INITIAL_STATE;
        }
        default:{
          return {...state};
        }
      }
  }