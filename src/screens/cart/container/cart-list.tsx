import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import CartItem from '../component/cart-item';
import {Card, SeparatorLine} from '../../../common/utils';
import { Colors } from '../../../common/styles';
import { CartService } from '../../../services/cart-service';
import { Product, CartResponse } from '../../../interfaces';
import RetryMessage from '../../../common/retry';
import { Props } from '../../../interfaces';
import Button from '../../../common/generalButton';

class CartList extends Component<Props> {
    service = new CartService();
    // service = CartService.getService() as CartService;
    state : { loading : boolean} = {
        loading : false,
    }

    keyExtractor = (item: Product, index: number) => `${index}-${item.id.toString()}`;
    renderItem = ({item}: any) => {
        return (
            <CartItem item={item}
                onPressContainer={ () => { this.props.navigation.navigate('Details',{productId : item.id});}}
                onPressRemove={ () => { this.removeItem(item.id)}}/>
        );
    }

    separator = () => {
        return (
            <SeparatorLine></SeparatorLine>
        )
    }

    emptyCart(){
        return(
            <View>
                <Text style={styles.cart_total}>Todavía no hay productos</Text>
            </View>
        );
    }

    deleteCart(){
        this.setState({
            loading : true
        });
        this.service.deleteCart().then( () => {
            this.setState({
                loading : false,
            });
        })
    }

    removeItem(id: number){
        // this.service
        this.setState({
            loading : true
        });
        this.service.removeItem(id).then( res => {
        }).finally( () => {
            this.setState({
                loading : false,
            });
        });
    }

    removeContent(){
        if(this.state.loading){
            return (
                <View style={styles.loadingPanel}>
                    <ActivityIndicator animating={true} color='white' size={'large'}></ActivityIndicator>
                </View>
            );
        }
    }

    render(){
        if(!this.service.isApiOk()){
            return(<RetryMessage loading={true}></RetryMessage>);
        }
        return (
            <View style={styles.screen_container}>
                <View style={styles.cart_container}>
                    <Card>
                        <View style={styles.title_container}>
                            <Text style={styles.cart_title}>Carrito de Compras</Text>
                            <Text style={styles.cart_total}>Total: ${this.service.getCart().total}</Text>
                        </View>
                    </Card>
                    <Card>
                        <View style={{height : 575}}>
                            {/* {this.removeContent()} */}
                            <FlatList style={{height : '100%'}}
                                keyExtractor={this.keyExtractor}
                                data={this.service.getCart().cart}
                                ItemSeparatorComponent={this.separator}
                                renderItem={this.renderItem}
                                ListEmptyComponent={this.emptyCart}
                            />
                        </View>
                    </Card>
                    <View style={styles.buttons_container}>
                        <Button style={styles.delete_cart} underlayColor={Colors.gray} onPress={() => {this.deleteCart()}} disabled={this.state.loading}>
                            <Text style={styles.delete_cart_text}>Eliminar Carrito</Text>
                        </Button>
                        <Button style={styles.proceed} underlayColor={Colors.darkBlue} disabled={this.state.loading}>
                            <Text style={styles.proceed_text}>Proceder con pago</Text>
                        </Button>
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
    loadingPanel : {
        height : '100%',
        width : '100%',
        backgroundColor : Colors.disabled,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default CartList;