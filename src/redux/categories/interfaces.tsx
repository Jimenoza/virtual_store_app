import { Category, Product } from '../../interfaces';

export enum CATEGORY_ACTION {
    set = 'category/set',
    delete = 'category/delete',
}

export interface categoryAction {
    type: CATEGORY_ACTION,
    payload?: CategoriesIndex,
}

export interface CategoriesIndex {
    categories? : Category[],
}