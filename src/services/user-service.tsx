import { Service } from './common/service';
import { UserResponse } from '../interfaces';
import { combinedStores, USER_ACTION } from '../redux';

export class UserService extends Service {

    login( email: string, pass : string): Promise<void>{
        return new Promise((resolve,reject) => {
            this.http.httpPOST('/login',{ email : email, password : pass}).then( (response: UserResponse) => {
                // console.log(response.data);
                if(response.error){
                    reject(response.error);
                }
                else {
                    combinedStores.dispatch({type : USER_ACTION.login, payload : response.data});
                    resolve();
                }
            }).catch( err => {
                reject(err);
            })
        });
    }

    getUser(){
        return combinedStores.getState().userState.user;
    }

    getToken(){
        return combinedStores.getState().userState.token;
    }

    /**
     * Returns true if the user has logged in (user in session)
     * Returns false if the user has not logged in or has logged out
     * @returns boolean
     */
    userHasLoggedIn(){
        return combinedStores.getState().userState.user !== null;
    }
}