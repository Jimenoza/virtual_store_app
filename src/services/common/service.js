import HttpService from './api';

export class Service {
    http = HttpService.getInstance();
    
    isApiOk(){
        return !this.http.error;
    }
}