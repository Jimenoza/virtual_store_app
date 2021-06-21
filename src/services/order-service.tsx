import { Service } from './common/service';
import { Order, OrderDetailedResponse, OrderResponse, Product, CartResponse} from '../interfaces';
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

    generateOrder(address: string): Promise<void>{
        return new Promise( (resolve,reject) => {
            this.http.httpGET('/cart').then( (response: CartResponse) => {
                if(response.data.cart.length === 0){
                    const cart = {
                        cart : combinedStores.getState().cartState.cart,
                        total : combinedStores.getState().cartState.total
                    }
                    this.http.httpPUT('/cart',{data : cart}).then( res => {
                        this.http.httpPOST('/orders', {data : { address : address}}).then( res => {
                            if(res.data){
                                resolve();
                            }
                            else {
                                reject();
                            }
                        }).catch( err => reject(err));
                    }).catch( err => { reject(err)});
                }
                else{
                    this.http.httpPOST('/orders', { address : address}).then( res => {
                        console.log(res);
                        if(res.data){
                            resolve();
                        }
                        else {
                            reject();
                        }
                    }).catch( err => {console.log(err),reject(err)});
                }
            });
        });
    }
}