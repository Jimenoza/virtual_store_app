import {replace_host} from '../../common/utils';

class HttpService {
  baseUrl = replace_host('http://localhost:8000/api/');
  httpGET(uri,useBase = true){
    let url = '';
    if(useBase){
      url = `${this.baseUrl}${uri}`
    }
    else {
      url = uri;
    }
    return new Promise( (resolve, reject) => {
        fetch(url,).then( response => {
          resolve(response.json());
        }).catch( err => {
          reject(err);
        });
    });
  }

}

export default HttpService;