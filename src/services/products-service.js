import HttpService from './common/api';

export class ProductService {
    api = new HttpService();
    pages = null;
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
                resolve(response.data.data);
            }).catch( err => {
                reject(err);
            })
        });
    }

    getNextPageData(){
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

    getPreviousPageData(){
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

    getCurrentPage(){
        return this.pages.currentPage;
    }

    getLastPage(){
        return this.pages.lastPage;
    }

    isThereNextPage(){
        return this.pages.next !== null;
    }

    isTherePreviousPage(){
        return this.pages.previous !== null;
    }

}