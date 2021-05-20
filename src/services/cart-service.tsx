import { Service } from './common/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subject } from 'rxjs';
import { CartResponse, Cart} from '../interfaces/cart-interfaces';
import { cartStore } from '../redux/store/cart-store';
import { CART_ACTION } from '../redux/common';

export class CartService extends Service{
    cart: CartResponse = null!;
    // cartSubscription = new Subject<any[]>();

    subscribe(handler : () => void){
        return cartStore.subscribe(handler);
    }

    getCart(): Promise<CartResponse>{
        return new Promise((resolve, reject) => {
         //    resolve(cart);
            AsyncStorage.getItem('cart').then( cart => {
                if(cart){
                    this.cart = JSON.parse(cart);
                    resolve(this.cart);
                }
                else {
                    this.http.httpGET('/cart').then( (response: CartResponse) => {
                        AsyncStorage.setItem('cart', JSON.stringify(response)).then( res => {
                            this.cart = response;
                            resolve(response);
                        }).catch( err => {
                            reject(err);
                        });
                    }).catch( err => {
                        reject(err);
                    });
                }
            }).catch( err => {
                reject(err);
            })
        });
     }

    getLocalCart(){
        return this.cart;
    }

    setCart(cart : CartResponse){
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem('cart', JSON.stringify(cart)).then( res => {
                this.cart = cart;
                // this.cartSubscription.next(this.cart.data.cart);
                cartStore.dispatch({type : CART_ACTION.set,payload : cart.data.cart});
                resolve(res);
            }).catch( err => {
                reject(err);
            });
        })
    }

    addItem(id: number){
        return new Promise( (resolve,reject) => {
            this.http.httpPOST(`/cart/${id}`).then( (response: CartResponse) => {
                // console.log(response);
                this.setCart(response).then( res => {
                    resolve(res);
                }).catch( err => {
                    reject(err);
                });
            }).catch( err => {
                reject(err)
            });
        });
    }

    deleteCart(){
        return new Promise( (resolve,reject) => {
            this.http.httpDELETE('/cart').then( (response: CartResponse) => {
                AsyncStorage.removeItem('cart').then( res => {
                    this.cart = response;
                    cartStore.dispatch({type : CART_ACTION.set,payload : response.data.cart});
                    // this.cartSubscription.next(this.cart.data.cart);
                    resolve(this.cart);
                }).catch( err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        });
    }
}