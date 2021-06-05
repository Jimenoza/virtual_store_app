import { Service } from './common/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subject } from 'rxjs';
import { CartResponse, Cart} from '../interfaces/cart-interfaces';
import { combinedStores, CART_ACTION } from '../redux';

export class CartService extends Service{
    cart: CartResponse = null!;
    // cartSubscription = new Subject<any[]>();

    subscribe(handler : () => void){
        combinedStores.subscribe(handler);
    }

    getCart(){
        return combinedStores.getState().cartReducer;
        // return new Promise((resolve, reject) => {
        //  //    resolve(cart);
        //     AsyncStorage.getItem('cart').then( cart => {
        //         if(cart){
        //             this.cart = JSON.parse(cart);
        //             resolve(this.cart);
        //         }
        //         else {
        //             this.http.httpGET('/cart').then( (response: CartResponse) => {
        //                 AsyncStorage.setItem('cart', JSON.stringify(response)).then( res => {
        //                     this.cart = response;
        //                     resolve(response);
        //                 }).catch( err => {
        //                     reject(err);
        //                 });
        //             }).catch( err => {
        //                 reject(err);
        //             });
        //         }
        //     }).catch( err => {
        //         reject(err);
        //     })
        // });
    }

    setCart(cart : CartResponse){
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem('cart', JSON.stringify(cart)).then( res => {
                this.cart = cart;
                // this.cartSubscription.next(this.cart.data.cart);
                // cartStore().store.dispatch({type : CART_ACTION.set,payload : res});
                resolve(res);
            }).catch( err => {
                reject(err);
            });
        })
    }

    addItem(id: number): Promise<void>{
        return new Promise( (resolve,reject) => {
            this.http.httpPOST(`/cart/${id}`).then( (response: CartResponse) => {
                combinedStores.dispatch({type : CART_ACTION.set,payload : response.data});
                resolve();
            }).catch( err => {
                reject(err)
            });
        });
    }

    removeItem(id: number){
        return new Promise( (resolve,reject) => {
            this.http.httpDELETE(`/cart/${id}`).then( (response: CartResponse) => {
                combinedStores.dispatch({type : CART_ACTION.set,payload : response.data});
                resolve(response);
            }).catch( err => {
                reject(err)
            });
        });
    }

    deleteCart(): Promise<void>{
        return new Promise( (resolve,reject) => {
            this.http.httpDELETE('/cart').then( (response: CartResponse) => {
                combinedStores.dispatch({type : CART_ACTION.delete});
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }
}