import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Colors } from '../../../common/styles';
import ProductList from '../../product/containers/product-list';
import { Props } from '../../../interfaces/common';
import { OrderDetailedResponse } from '../../../interfaces/order-interfaces';
import { Product } from '../../../interfaces/product-interfaces';

class OrderDetail extends Component<Props>{
    products: Product[]; //TODO: change any[] for Product[]
    constructor(props: any){
        super(props);
        this.products = products.data;
    }
    render(){
        return(
            <View style={styles.background}>
                <View style={styles.display}>
                    <ProductList {...this.props} items={this.products}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background : {
        flex: 1,
        backgroundColor : Colors.backgroundBlue
    },
    display : {
        alignItems: 'center'
    }
})

const products : OrderDetailedResponse = {
    "data": [
        {
            "name": "Fallout 4",
            "description": "Un mundo postapocalíptico después de una guerra nuclear",
            "image": "http://localhost:8000/images/productos/1603339114.webp",
            "price": 45,
            "available": true,
            "category_id": 2,
            "category_name": "Videojuegos",
            "id" : 4,
            "stock" : 1,
            "average" : 1,
            "califications" : 1
        },
        {
            "name": "The last of us",
            "description": "Juego del año 2013",
            "image": "http://localhost:8000/images/productos/1601437419.jpg",
            "price": 19.99,
            "available": true,
            "category_id": 2,
            "category_name": "Videojuegos",
            "id" : 5,
            "stock" : 1,
            "average" : 1,
            "califications" : 1
        }
    ],
    "error": null
};

export default OrderDetail;