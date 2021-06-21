import {replace_host} from '../../common/utils';
import { Response } from '../../interfaces/common';

const CODES = {
  SUCCESS : 200,
  NOT_FOUND : 404,
  ERROR : 500
}

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

class HttpService {
  baseUrl = replace_host('http://localhost:8000/api');
  error = false;
  headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  private static instance: HttpService;

  static getInstance() : HttpService {
    if(!this.instance){
      this.instance = new HttpService();
    }
    return this.instance;
  }

  setHeaders(headers : any){
    Object.keys(headers).forEach( key => {
      this.headers[key] = headers[key];
    });
  }

  httpGET(uri : string,useBase: boolean = true): Promise<Response>{
    let url = '';
    if(useBase){
      url = `${this.baseUrl}${uri}`
    }
    else {
      url = uri;
    }
    return this.request(url,'GET');
  }

  httpPOST(uri : string,body: any = null): Promise<Response>{
    return this.request(`${this.baseUrl}${uri}`,'POST',body);
  }

  httpDELETE(uri: string): Promise<Response>{
    return this.request(`${this.baseUrl}${uri}`,'DELETE');
  }

  httpPUT(uri : string,body: any = null): Promise<Response>{
    return this.request(`${this.baseUrl}${uri}`,'PUT',body);
  }

  private request(url : string, method : Method,data = null): Promise<Response>{
    // console.log(`${method} to ${url}`);
    return new Promise( (resolve, reject) => {
      const requestOptions: any = {
        method: method,
        headers: this.headers,
      };
      if(data){
        requestOptions.body = JSON.stringify(data);
      }
      fetch(url,requestOptions).then( response => {
        console.log('fetching....');
        response.json().then( json => { // sets response object to json
          console.log('fetching.... success');
          if(response.status === CODES.ERROR){ //server has a problem
            this.error = true;
            reject(json);
          }
          else {
            if(this.error){ this.error = false;}
            resolve(json);
          }
        });
      }).catch( err => { // Error requesting to server
        console.log('fetching.... failed');
        console.log(err);
        this.error = true;
        reject(err);
      });
    });
  }

}

export default HttpService;