import HttpService from './common/api';
import {Service} from './common/service';
import { ProductOverviewResponse, Product, ProductDetailedResponse, ProductDetail } from '../interfaces/product-interfaces';
import { productStore, PRODUCT_ACTION, ProductsIndex } from '../redux';

interface Pages {
    currentPage : number,
    lastPage : number,
    next?: string,
    previous?: string,

};

export class ProductService extends Service{
    private pages: Pages;
    private products: Product[] = [];

    constructor(){
        super();
        this.pages = {
            currentPage : 0,
            lastPage: 0,
        }
    }

    getListProducts(amount: number): Promise<void>{
        let url = `/products/list/${amount}`;
        return new Promise( (resolve, reject) => {
            this.http.httpGET(url).then( (response : ProductOverviewResponse) => {
                // this.pages = { 
                //     currentPage : response.data.current_page,
                //     lastPage : response.data.last_page,
                //     next : response.data.next_page_url,
                //     previous : response.data.prev_page_url
                // }
                // this.products = response.data.data;
                this.setState(response);
                resolve();
            }).catch( err => {
                reject(err);
            })
        });
    }

    getNextPage(): Promise<void>{
        return new Promise( (resolve, reject) => {
            this.http.httpGET(productStore.getState().next_page_url!,false).then( (response : ProductOverviewResponse) => {
                // this.pages = {
                //     currentPage : response.data.current_page,
                //     lastPage : response.data.last_page,
                //     next : response.data.next_page_url,
                //     previous : response.data.prev_page_url
                // }
                // this.products = response.data.data;
                this.setState(response);
                resolve()
            }).catch( err => {
                reject(err);
            })
        });
    }

    getPreviousPage():Promise<void>{
        return new Promise( (resolve, reject) => {
            this.http.httpGET(productStore.getState().prev_page_url!,false).then( response => {
                // this.pages = {
                //     currentPage : response.data.current_page,
                //     lastPage : response.data.last_page,
                //     next : response.data.next_page_url,
                //     previous : response.data.prev_page_url
                // }
                // this.products = response.data.data;
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

    getCurrentPage(): number{
        return productStore.getState().current_page
    }

    getLastPage(): number{
        return productStore.getState().last_page;
    }

    canGotoNext(): boolean{
        return productStore.getState().next_page_url !== null;
    }

    canGoToBack(): boolean{
        return productStore.getState().prev_page_url !== null;
    }

    getCacheProducts(): Product[]{
        return productStore.getState().products;
    }

    deleteProducts(): void{
        productStore.dispatch({type : PRODUCT_ACTION.delete});
    }

    subscribe(handler : () => void){
        productStore.subscribe(handler);
    }

    setState(data : ProductOverviewResponse){
        let body: ProductsIndex = {
            current_page : data.data.current_page,
            last_page: data.data.last_page,
            next_page_url : data.data.next_page_url,
            prev_page_url : data.data.prev_page_url,
            products : data.data.data,
        };
        productStore.dispatch({type : PRODUCT_ACTION.set,payload : body});
    }

}