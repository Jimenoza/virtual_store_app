import {replace_host} from '../../common/utils';

const CODES = {
  SUCCESS : 200,
  NOT_FOUND : 404,
  ERROR : 500
}

class HttpService {
  baseUrl = replace_host('http://localhost:8000/api/');
  error = false;
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  static instance = null;

  static getInstance() : HttpService {
    if(!this.instance){
      this.instance = new HttpService();
    }
    return this.instance;
  }

  httpGET(uri,useBase = true){
    let url = '';
    if(useBase){
      url = `${this.baseUrl}${uri}`
    }
    else {
      url = uri;
    }
    return this.request(url,'GET');
  }

  httpPOST(uri, body){
    return this.request(uri,'POST',body);
  }

  request(url,method,data = null){
    return new Promise( (resolve, reject) => {
      const requestOptions = {
        method: method,
        headers: this.headers,
      };
      if(data){
        requestOptions.data = JSON.stringify(data);
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
        }).catch( err => { // Error parsing response into json
          console.log('fetching.... failed');
          console.log(err);
          reject(err);
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