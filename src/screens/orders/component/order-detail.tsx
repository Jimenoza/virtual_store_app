import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { Colors } from '../../../common/styles';
import ProductList from '../../product/containers/product-list';
import { Props, OrderDetailedResponse, Product } from '../../../interfaces';
import { OrderService } from '../../../services';

class OrderDetail extends Component<Props>{
    service = new OrderService();
    state : { loading: boolean, products: Product[]  } = {
        loading : true,
        products: []
    }
    constructor(props: any){
        super(props);
    }

    componentDidMount(){
        const orderId = this.props.route.params.order_id;
        this.service.getOrder(orderId).then( res => {
            this.setState({
                products : res,
                loading : false
            })
        });
    }

    render(){
        if(this.state.loading){
            return(
                <View style={styles.centerLoader}>
                    <ActivityIndicator size='large' color={Colors.bluePrimary} animating={true}/>
                </View>
            )
        }
        return(
            <View style={styles.background}>
                <View style={styles.display}>
                    <ProductList {...this.props} items={this.state.products}/>
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
    },
    centerLoader : {
        marginTop: 20,
        justifyContent: 'center',
        flex: 1,
    },
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