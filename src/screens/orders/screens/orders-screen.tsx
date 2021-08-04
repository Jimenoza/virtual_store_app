import React from 'react'
import { Component } from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import { Colors } from '../../../common/styles';
import { Card } from '../../../common/utils';
import OrderItem from '../components/order-item';
import { OrderResponse, Order } from '../../../interfaces/order-interfaces';
import { Props } from '../../../interfaces/common';
import { OrderService } from '../../../services';
import { Icon } from 'react-native-elements';
import ScreenMessage from '../../../common/screenMessage';
// import {} from '../../product/containers/product-list';

class Orders extends Component<Props>{
    service: OrderService = new OrderService();
    state : { loading: boolean } = {
        loading : true,
    }

    componentDidMount(){
        this.service.getOrders().then( () => {
            this.setState({
                loading : false
            });
        });
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

    displayMessage(){
        return <ScreenMessage message={'Realiza antes al menos un pedido'} iconName={'inventory'}/>;
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
                <Card style={styles.title_container}>
                    <Text style={styles.orders_title}>Mis órdenes</Text>
                </Card>
                <FlatList 
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyExtractor={this.keyExtractor}
                    data={this.service.getState()}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.displayMessage()}
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
    centerLoader : {
        marginTop: 20,
        justifyContent: 'center',
        flex: 1,
    },

});

export default Orders;