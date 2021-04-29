import React from 'react'
import { Component } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { Colors } from '../../../common/styles';
import { Card } from '../../../common/utils';
import OrderItem from '../component/order-item';
import { OrderResponse, Order } from '../../../services/interfaces/order-interfaces';
// import {} from '../../product/containers/product-list';

interface Props {
    navigation: any
}

class Orders extends Component<Props>{

    state : { orders : OrderResponse } = {
        orders : orders
    }

    goToDetails = (item : Order) => {
        this.props.navigation.push('OrderDetail',{order_id : item.id});
    }

    keyExtractor = (item : Order) => item.id.toString();
    renderItem = ({item}: any) => {
        return (
            <Card style={{marginBottom : 15}}>
                <OrderItem item={item} onPress={() => {this.goToDetails(item)}}/>
            </Card>
        );
    }

    render(){
        return(
            <View style={styles.background}>
                <Card style={styles.title_container}>
                    <Text style={styles.orders_title}>Mis órdenes</Text>
                </Card>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.orders.data}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background : {
        backgroundColor : Colors.backgroundBlue,
        flex : 1,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15
    },
    title_container : {
        flexDirection: 'row',
        justifyContent : 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
    },
    orders_title : {
        fontSize: 25,
        fontWeight: '500',
    },

})

const orders: OrderResponse = {
    "data": [
        {
            "id": 3,
            "total": 70,
            "date": "2018-09-21 23:17:18",
            "address": "Mi casa",
            "user_id": 2
        },
        {
            "id": 7,
            "total": 15,
            "date": "2018-09-21 23:32:51",
            "address": "Mi casa nueva",
            "user_id": 2
        },
        {
            "id": 8,
            "total": 10,
            "date": "2018-09-22 00:00:16",
            "address": "Donde sea",
            "user_id": 2
        },
        {
            "id": 12,
            "total": 59.99,
            "date": "2018-09-24 16:39:44",
            "address": "Mi choza",
            "user_id": 2
        },
        {
            "id": 18,
            "total": 79.98,
            "date": "2020-09-28 22:57:54",
            "address": "mikasa",
            "user_id": 2
        },
        {
            "id": 19,
            "total": 139.97,
            "date": "2020-10-01 20:24:06",
            "address": "A mi play 4 y a mi switch",
            "user_id": 2
        },
        {
            "id": 20,
            "total": 27,
            "date": "2020-10-01 23:41:20",
            "address": "Alguna escuela",
            "user_id": 2
        },
        {
            "id": 21,
            "total": 65.99,
            "date": "2020-10-11 19:15:47",
            "address": "Embajada de Territorio de Zaguates",
            "user_id": 2
        },
        {
            "id": 22,
            "total": 130,
            "date": "2020-10-24 14:34:48",
            "address": "A mi casa",
            "user_id": 2
        }
    ],
    "error": null
}

export default Orders;