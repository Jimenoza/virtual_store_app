const BASE_API = 'localhost:8000/api/';

class API {
    httpGET(url){
        return new Promise( (resolve, reject) => {
            fetch(`${BASE_API}movie_suggestions.json?movie_id=${id}`).then( response => {
              resolve(response.json());
            }).catch( err => {
              reject(err);
            });
        });
    }
}