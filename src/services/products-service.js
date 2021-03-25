import HttpService from './common/api';

export class ProductService {
    api = HttpService.getInstance();
    pages = null;
    // apiOK = true;
    getListProducts(amount){
        let url = `products/list`;
        if(amount){
            url += `/${amount}` 
        }
        return new Promise( (resolve, reject) => {
            this.api.httpGET(url).then( response => {
                this.pages = { 
                    currentPage : response.data.current_page,
                    lastPage : response.data.last_page,
                    next : response.data.next_page_url,
                    previous : response.data.prev_page_url
                }
                // if(!this.apiOK){this.apiOK = true;}
                resolve(response.data.data);
            }).catch( err => {
                // this.apiOK = false;
                reject(err);
            })
        });
    }

    getNextPage(){
        return new Promise( (resolve, reject) => {
            if(this.pages && this.pages.next){
                this.api.httpGET(this.pages.next,false).then( response => {
                    this.pages = {
                        currentPage : response.data.current_page,
                        lastPage : response.data.last_page,
                        next : response.data.next_page_url,
                        previous : response.data.prev_page_url
                    }
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
                this.api.httpGET(this.pages.previous,false).then( response => {
                    this.pages = {
                        currentPage : response.data.current_page,
                        lastPage : response.data.last_page,
                        next : response.data.next_page_url,
                        previous : response.data.prev_page_url
                    }
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
        const url = `products/${id}`;
        return new Promise( (resolve, reject) => {
            this.api.httpGET(url).then( response => {
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

    isApiOk(){
        return !this.api.error;
    }

}