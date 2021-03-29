import { Service } from './common/service';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export class CartService extends Service{

    getCart(){
       return new Promise((resolve, reject) => {
           resolve(cart);
        //    AsyncStorage.getItem('cart').then( cart => {
        //        if(cart){
        //            resolve(JSON.parse(cart));
        //        }
        //        else {
        //            this.http.httpGET('/cart').then( response => {
        //                AsyncStorage.setItem('item', JSON.stringify(response)).then( res => {
        //                    resolve(response);
        //                }).catch( err => {
        //                    reject(err);
        //                });
        //            }).catch( err => {
        //                reject(err);
        //            });
        //        }
        //    }).catch( err => {
        //        reject(err);
        //    })
       });
    }
}

const cart = {
    "data": {
        "total": 25,
        "cart": [
            {
                "id": 1,
                "name": "Bulto Jansport",
                "description": "Bulto azul con fondo café",
                "image": "http://localhost:8000/images/productos/1602557763.jpg",
                "price": 15,
                "stock": 18,
                "available": 1,
                "califications": 1,
                "average": 5,
                "category_id": 1,
                "category_name": "Escolar"
            },
            {
                "id": 2,
                "name": "Billetera",
                "description": "Billetera para hombre",
                "image": "http://localhost:8000/images/productos/1601436540.jpg",
                "price": 10,
                "stock": 31,
                "available": 1,
                "califications": 0,
                "average": 0,
                "category_id": 4,
                "category_name": "Accesorios"
            }
        ]
    },
    "error": null
}