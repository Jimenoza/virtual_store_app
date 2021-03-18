import HttpService from './common/api';

export class ProductService {
    api = new HttpService();
    getIndexProducts(){
        return this.api.httpGET('products');
    }
}