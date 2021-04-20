import HttpService from './api';

export class Service {
    http = HttpService.getInstance();
    private static instance: Service;
    
    isApiOk(){
        return !this.http.error;
    }

    static getService(): Service {
        if(!this.instance){
            this.instance = new this();
        }
        return this.instance;
    }
    
}