import {Service} from './common/service';
import { Category, CategoryResponse, ProductOverviewResponse } from '../interfaces';
import { CATEGORY_ACTION, categoriesStore} from '../redux'

export class CategoryService extends Service{

    subscribe(handler : () => void){
        categoriesStore.subscribe(handler);
    }
    
    getCategories(): Promise<void>{
        return new Promise( (resolve, reject) => {
            this.http.httpGET(`/categories`).then( (response : CategoryResponse) => {
                categoriesStore.dispatch({type : CATEGORY_ACTION.setCategories,payload : { categories : response.data}});
                resolve();
            }).catch( err => {
                reject(err);
            })
        });
    }

    getStateCategories(){
        return categoriesStore.getState().categories;
    }

    getStateProducts(){
        return categoriesStore.getState().products;
    }

    setProductsState(data : ProductOverviewResponse){
        categoriesStore.dispatch(
            {
                type : CATEGORY_ACTION.setProducts,
                payload : { 
                    products : {
                        current_page : data.data.current_page,
                        last_page: data.data.last_page,
                        next_page_url : data.data.next_page_url,
                        prev_page_url : data.data.prev_page_url,
                        products : data.data.data,
                    }
                }
            }
        );
    }

}