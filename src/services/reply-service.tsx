import {Service} from './common/service';
import { Reply } from '../interfaces';
import { Store } from 'redux';
import { combinedStores } from '../redux';

export class ReplyService extends Service {
    leaveReply(rateId: number,comment: string){
        const body = {
            replyText : comment
        }
        return new Promise<Reply[]>( (resolve,reject) => {
            resolve([{"calification_id": 1, "id": 7, "reply": "Me duró años", "userName": "Juan", "user_id": 2}])
            // this.http.httpPOST(`/products/reply/${rateId}`,body).then( res => {
            //     resolve();
            // })
            // .catch( err => {
            //     reject(err);
            // })
        });
    }
}