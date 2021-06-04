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
                categoriesStore.dispatch({type : CATEGORY_ACTION.set,payload : { categories : response.data}});
                resolve();
            }).catch( err => {
                reject(err);
            })
        });
    }

    getState(){
        return categoriesStore.getState().categories;
    }

}