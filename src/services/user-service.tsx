import { Service } from './common/service';
import { UserResponse } from '../interfaces';
import { combinedStores, USER_ACTION } from '../redux';

export class UserService extends Service {

    login( email: string, pass : string){
        return new Promise((resolve,reject) => {
            this.http.httpPOST('/login',{ email : email, password : pass}).then( (response: UserResponse) => {
                console.log(response.data);
                combinedStores.dispatch({type : USER_ACTION.login, payload : response.data});
            })
        });
    }
}