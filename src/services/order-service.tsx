import { Service } from './common/service';
import { Order, OrderDetailedResponse, OrderResponse, Product} from '../interfaces';
import { combinedStores, ordersStore, ORDER_ACTION } from '../redux';

export class OrderService extends Service {

    constructor(){
        super();
        if(combinedStores.getState().userState.token !== null){
            this.http.setHeaders({'Authorization' : `Bearer ${combinedStores.getState().userState.token}`});
        }
        else {
            throw new Error('A user must have been logged In');
        }
    }

    getOrders(): Promise<void>{
        return new Promise( (resolve,reject) =>{
            this.http.httpGET('/orders').then( (response: OrderResponse) => {
                ordersStore.dispatch({type : ORDER_ACTION.set, payload : { orders : response.data}});
                resolve();
            }).catch( err => {
                reject(err)
            });
        });
    }

    getOrder(id : string): Promise<Product[]>{
        return new Promise( (resolve,reject) => {
            this.http.httpGET(`/orders/${id}`).then( (response: OrderDetailedResponse) => {
                resolve(response.data);
            }).catch( err => {
                reject(err);
            });
        });
    }

    getState(): Order[]{
        return ordersStore.getState().orders;
    }
}