import HttpService from './common/api';
import {Service} from './common/service';
import { ProductOverviewResponse, Product, ProductDetailedResponse, ProductDetail } from './product-interfaces';

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

    getListProducts(amount: number): Promise<Product[]>{
        let url = `/products/list`;
        if(amount){
            url += `/${amount}` 
        }
        return new Promise( (resolve, reject) => {
            this.http.httpGET(url).then( (response : ProductOverviewResponse) => {
                this.pages = { 
                    currentPage : response.data.current_page,
                    lastPage : response.data.last_page,
                    next : response.data.next_page_url,
                    previous : response.data.prev_page_url
                }
                this.products = response.data.data;
                resolve(response.data.data);
            }).catch( err => {
                reject(err);
            })
        });
    }

    getNextPage(): Promise<Product[]>{
        return new Promise( (resolve, reject) => {
            if(this.pages && this.pages.next){
                this.http.httpGET(this.pages.next,false).then( (response : ProductOverviewResponse) => {
                    this.pages = {
                        currentPage : response.data.current_page,
                        lastPage : response.data.last_page,
                        next : response.data.next_page_url,
                        previous : response.data.prev_page_url
                    }
                    this.products = response.data.data;
                    resolve(response.data.data)
                }).catch( err => {
                    reject(err);
                })
            }else {
                resolve([]);
            }
        });
    }

    getPreviousPage():Promise<Product[]>{
        return new Promise( (resolve, reject) => {
            if(this.pages && this.pages.previous){
                this.http.httpGET(this.pages.previous,false).then( response => {
                    this.pages = {
                        currentPage : response.data.current_page,
                        lastPage : response.data.last_page,
                        next : response.data.next_page_url,
                        previous : response.data.prev_page_url
                    }
                    this.products = response.data.data;
                    resolve(response.data.data)
                }).catch( err => {
                    reject(err);
                })
            }else {
                resolve([]);
            }
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
        return this.pages.currentPage;
    }

    getLastPage(): number{
        return this.pages.lastPage;
    }

    canGotoNext(): boolean{
        return this.pages.next !== null;
    }

    canGoToBack(): boolean{
        return this.pages.previous !== null;
    }

    getCurrentProducts(): Product[]{
        return this.products;
    }

    deleteProducts(): void{
        this.products = [];
    }

}