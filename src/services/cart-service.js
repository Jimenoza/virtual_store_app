import { Service } from './common/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Observable, Subject } from 'rxjs';

export class CartService extends Service{
    cart = null;
    amountObservable = new Subject();

    // constructor(){
    //     if(this.cart){
    //         this.amountObservable.next(this.cart.data.cart);
    //     }
    // }

    getCart(){
        return new Promise((resolve, reject) => {
         //    resolve(cart);
            AsyncStorage.getItem('cart').then( cart => {
                if(cart){
                    this.cart = JSON.parse(cart);
                    resolve(this.cart);
                }
                else {
                    this.http.httpGET('/cart').then( response => {
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

    getCartData(){
        if(!this.cart){
            return [];
        }
        return this.cart.data.cart;
    }

    setCart(cart){
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem('cart', JSON.stringify(cart)).then( res => {
                this.cart = cart;
                this.amountObservable.next(this.cart.data.cart);
                resolve(res);
            }).catch( err => {
                reject(err);
            });
        })
    }

    addItem(id){
        return new Promise( (resolve,reject) => {
            this.http.httpPOST(`/cart/${id}`).then( response => {
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
            this.http.httpDELETE('/cart').then( response => {
                AsyncStorage.removeItem('cart').then( res => {
                    this.cart = response;
                    this.amountObservable.next(this.cart.data.cart);
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