import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import CartItem from '../component/cart-item';
import {Card, SeparatorLine} from '../../../common/utils';
import { Colors } from '../../../common/styles';
import { CartService } from '../../../services/cart-service';
import RetryMessage from '../../../common/retry';

class CartList extends Component {
    service = new CartService();
    state = {
        cart : null,
    }

    keyExtractor = item => item.id.toString();
    renderItem = ({item}) => {
        return (
            <CartItem {...item}/>
        );
    }

    separator = () => {
        // <CartItem {...cart.data.cart[0]}/>
        return (
            <SeparatorLine></SeparatorLine>
        )
    }
    componentDidMount(){
        this.service.getCart().then( res => {
            this.setState({
                cart : res
            });
        });
    }

    render(){
        if(!this.state.cart){
            return(<RetryMessage loading={this.state.cart === null}></RetryMessage>);
        }
        return (
            <View style={styles.screen_container}>
                <View style={styles.cart_container}>
                    <Card>
                        <View style={styles.title_container}>
                            <Text style={styles.cart_title}>Carrito de Compras</Text>
                            <Text style={styles.cart_total}>Total: ${this.state.cart.total}</Text>
                        </View>
                    </Card>
                    <Card>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.cart.cart}
                            ItemSeparatorComponent={this.separator}
                            renderItem={this.renderItem}
                        />
                    </Card>
                    <View style={styles.buttons_container}>
                        <TouchableHighlight style={styles.delete_cart} underlayColor={Colors.darkBlue}>
                            <Text style={styles.delete_cart_text}>Eliminar Carrito</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.proceed} underlayColor={Colors.darkBlue}>
                            <Text style={styles.proceed_text}>Proceder con pago</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen_container : {
        flex: 1,
        backgroundColor : Colors.backgroundBlue,
    },
    cart_container : {
        paddingTop: 25,
        paddingLeft: 15,
        paddingRight: 15
    },
    title_container : {
        flexDirection: 'row',
        justifyContent : 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    cart_title : {
        fontSize: 25,
        fontWeight: '500',
    },
    cart_total : {
        fontSize: 20,
        fontWeight: '500',
        justifyContent: 'center'
    },
    buttons_container : {
        flexDirection : 'row',
    },
    proceed : {
        flex: 1,
        backgroundColor: Colors.bluePrimary,
        height: 37.5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 7.5
    },
    proceed_text : {
        fontSize: 16,
        color: 'white'
    },
    delete_cart : {
        flex: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'white',
        height: 37.5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 7.5,
    },
    delete_cart_text : {
        fontSize: 16,
        color: 'rgba(0,0,0,0.5)'
    },
})

export default CartList;