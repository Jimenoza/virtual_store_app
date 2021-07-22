import HttpService from './common/api';
import {Service} from './common/service';
import { ProductOverviewResponse, Product, ProductDetailedResponse, ProductDetail,ProductCommentInterface,Comment, Reply } from '../interfaces';
import { PRODUCT_ACTION, ProductsIndex, ProductAction, combinedStores } from '../redux';
import { Store } from 'redux';

interface Pages {
    currentPage : number,
    lastPage : number,
    next?: string,
    previous?: string,

};

export class ProductService extends Service{
    store?: Store<ProductsIndex, ProductAction>;
    constructor(store?: Store<ProductsIndex, ProductAction>){
        super();
        if(store){
            this.store = store;
        }
    }

    getProducts(amount: number): Promise<void>{
        let url = `/products/list/${amount}`;
        return new Promise( (resolve, reject) => {
            this.http.httpGET(url).then( (response : ProductOverviewResponse) => {
                this.setState(response);
                resolve();
            }).catch( err => {
                reject(err);
            })
        });
    }

    searchProducts(expression: string, category? : number): Promise<void>{
        const body: any = {
            expression : expression,
            pagination : 10
        }
        if(category){
            body.category = category;
        }
        return new Promise( (resolve, reject) => {
            this.http.httpPOST('/products/search',body).then( (response : ProductOverviewResponse) => {
                this.setState(response);
                resolve();
            }).catch( err => {
                reject(err);
            })
        });
    }

    getNextPage(): Promise<void>{
        if(!this.store){
            throw new Error('This method needs store defined to work');
        }
        return new Promise( (resolve, reject) => {
            this.http.httpGET(this.store!.getState().next_page_url!,false).then( (response : ProductOverviewResponse) => {
                this.setState(response);
                resolve()
            }).catch( err => {
                reject(err);
            })
        });
    }

    getPreviousPage():Promise<void>{
        if(!this.store){
            throw new Error('This method needs store defined to work');
        }
        return new Promise( (resolve, reject) => {
            this.http.httpGET(this.store!.getState().prev_page_url!,false).then( response => {
                this.setState(response);
                resolve()
            }).catch( err => {
                reject(err);
            })
        });
    }

    getProduct(id: number): Promise<ProductDetail>{
        const url = `/products/${id}`;
        return new Promise( (resolve, reject) => {
            this.http.httpGET(url).then( (response : ProductDetailedResponse) => {
                resolve(response.data);
            }).catch( err => {
                reject(err);
            })
        });
    }

    getProductsByCategory(categoryID : number): Promise<void>{
        return new Promise( (resolve, reject) => {
            this.http.httpGET(`/products/category/${categoryID}`).then( (response : ProductOverviewResponse) => {
                this.setState(response);
                resolve();
            }).catch( err => {
                reject(err);
            })
        });
    }

    getCurrentPage(): number{
        if(!this.store){
            throw new Error('This method needs store defined to work');
        }
        return this.store.getState().current_page
    }

    getLastPage(): number{
        if(!this.store){
            throw new Error('This method needs store defined to work');
        }
        return this.store.getState().last_page;
    }

    canGotoNext(): boolean{
        if(!this.store){
            throw new Error('This method needs store defined to work');
        }
        return this.store.getState().next_page_url !== null;
    }

    canGoToBack(): boolean{
        if(!this.store){
            throw new Error('This method needs store defined to work');
        }
        return this.store.getState().prev_page_url !== null;
    }

    getProductsState(): Product[]{
        if(!this.store){
            throw new Error('This method needs store defined to work');
        }
        return this.store.getState().products;
    }

    deleteProducts(): void{
        if(!this.store){
            throw new Error('This method needs store defined to work');
        }
        this.store.dispatch({type : PRODUCT_ACTION.delete});
    }

    subscribe(handler : () => void){
        if(!this.store){
            throw new Error('This method needs store defined to work');
        }
        this.store.subscribe(handler);
    }

    setState(data : ProductOverviewResponse){
        if(!this.store){
            throw new Error('This method needs store defined to work');
        }
        let body: ProductsIndex = {
            current_page : data.data.current_page,
            last_page: data.data.last_page,
            next_page_url : data.data.next_page_url,
            prev_page_url : data.data.prev_page_url,
            products : data.data.data,
        };
        this.store.dispatch({type : PRODUCT_ACTION.set,payload : body});
    }

}