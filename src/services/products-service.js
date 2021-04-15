import HttpService from './common/api';
import {Service} from './common/service';

export class ProductService extends Service{
    pages = null;
    products = [];

    getListProducts(amount){
        let url = `/products/list`;
        if(amount){
            url += `/${amount}` 
        }
        return new Promise( (resolve, reject) => {
            this.http.httpGET(url).then( response => {
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

    getNextPage(){
        return new Promise( (resolve, reject) => {
            if(this.pages && this.pages.next){
                this.http.httpGET(this.pages.next,false).then( response => {
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
                resolve(null);
            }
        });
    }

    getPreviousPage(){
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
                resolve(null);
            }
        });
    }

    getProduct(id){
        const url = `/products/${id}`;
        return new Promise( (resolve, reject) => {
            this.http.httpGET(url).then( response => {
                resolve(response.data);
            }).catch( err => {
                reject(err);
            })
        });
    }

    getCurrentPage(){
        return this.pages.currentPage;
    }

    getLastPage(){
        return this.pages.lastPage;
    }

    canGotoNext(){
        return this.pages.next !== null;
    }

    canGoToBack(){
        return this.pages.previous !== null;
    }

    getCurrentProducts(){
        return this.products;
    }

    deleteProducts(){
        this.products = [];
    }

}