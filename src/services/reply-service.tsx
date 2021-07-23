import {Service} from './common/service';
import { Reply, ReplyResponse } from '../interfaces';
import { replyStore, REPLY_ACTION, combinedStores } from '../redux';

export class ReplyService extends Service {
    public leaveReply(rateId: number,comment: string){
        const body = {
            replyText : comment
        }
        return new Promise<Reply[]>( (resolve,reject) => {
            this.http.setHeaders({'Authorization' : `Bearer ${combinedStores.getState().userState.token}`})
            this.http.httpPOST(`/products/reply/${rateId}`,body).then( (res: ReplyResponse) => {
                resolve(res.data);
            })
            .catch( err => {
                reject(err);
            })
        });
    }

    public static setSelectedReply(replyID : number){
        replyStore.dispatch({type : REPLY_ACTION.set, payload : { reply : replyID}});
    }

    public static getSelectedReply(){
        return replyStore.getState().reply;
    }
}