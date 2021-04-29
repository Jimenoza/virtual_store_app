import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Colors } from '../../../common/styles';
import ProductList from '../../product/containers/product-list';
import { Props } from '../../../services/common/interfaces';
import { OrderDetailedResponse } from '../../../services/interfaces/order-interfaces';

class OrderDetail extends Component<Props>{
    products: any[]; //TODO: change any[] for Product[]
    constructor(props: any){
        super(props);
        this.products = products.data;
    }
    render(){
        return(
            // <View>
            //     <Text>
            //         Aqui van los productos de la orden
            //     </Text>
            // </View>
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

const products = {
    "data": [
        {
            "name": "Fallout 4",
            "description": "Un mundo postapocalíptico después de una guerra nuclear",
            "image": "http://localhost:8000/images/productos/1603339114.webp",
            "price": 45,
            "available": 1,
            "category_id": 2,
            "category_name": "Videojuegos",
            "id" : 4,
        },
        {
            "name": "The last of us",
            "description": "Juego del año 2013",
            "image": "http://localhost:8000/images/productos/1601437419.jpg",
            "price": 19.99,
            "available": 1,
            "category_id": 2,
            "category_name": "Videojuegos",
            "id" : 5
        }
    ],
    "error": null
};

export default OrderDetail;