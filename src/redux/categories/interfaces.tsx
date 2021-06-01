import { Category, Product } from '../../interfaces';

export enum CATEGORY_ACTION {
    set = 'category/set',
    delete = 'category/delete',
    setProducts = 'category/products',
    setCategories = 'category/categories'
}

export interface categoryAction {
    type: CATEGORY_ACTION,
    payload?: CategoriesIndex,
}

export interface CategoriesIndex {
    products? : {
      current_page: number,
      last_page: number,
      next_page_url?: string,
      prev_page_url?: string,
      products: Product[]
    }
    categories? : Category[],
  }