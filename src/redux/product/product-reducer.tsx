import { ProductsIndex, ProductAction } from './interfaces';

const initialState: ProductsIndex = {
    current_page: 0,
    last_page: 0,
    next_page_url: undefined,
    prev_page_url: undefined,
    products: []
}

export function productReducer(state:ProductsIndex = initialState, action: ProductAction) {
      switch (action.type) {
        case 'product/set': {
          return {...state, ...action.payload};
        }
        case 'product/delete': {
            return initialState;
          }
        default:{
          return {...state};
        }
      }
  }