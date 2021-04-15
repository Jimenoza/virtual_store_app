import HttpService from './api';

export class Service {
    http = HttpService.getInstance();
    static instance = null;
    
    isApiOk(){
        return !this.http.error;
    }

    static getService(): this {
        if(!this.instance){
            this.instance = new this();
        }
        return this.instance;
    }
    
}