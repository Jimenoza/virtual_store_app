
class HttpService {
  baseUrl = 'http://localhost:8000/api/'
  httpGET(url){
      return new Promise( (resolve, reject) => {
          fetch(`${this.baseUrl}${url}`,).then( response => {
            resolve(response.json());
          }).catch( err => {
            reject(err);
          });
      });
  }
}

export default HttpService;