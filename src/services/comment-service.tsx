import {Service} from './common/service';
import { Comment, ProductCommentInterface , Reply } from '../interfaces';
import { Store } from 'redux';
import { combinedStores } from '../redux';

export class CommentService extends Service {

    rateProduct(product: number,comment: string, rate: number): Promise<Comment[]> {
        const body = {
            comment : comment,
            rate : rate,
        }
        return new Promise( (resolve,reject) => {
            this.http.setHeaders({'Authorization' : `Bearer ${combinedStores.getState().userState.token}`})
            this.http.httpPOST(`/products/comment/${product}`,body).then( (response: ProductCommentInterface) => {
                console.log(response);
                if(response.data.result){
                    resolve(response.data.comments.comments);
                }
                else {
                    reject();
                }
            })
            .catch( err => { console.error(err); reject(err)})
        });
    }
}