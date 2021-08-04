import React, { Component } from 'react';
import {View,Text, StyleSheet, FlatList, TextInput, ActivityIndicator, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Dimensions, TextInputSubmitEditingEventData} from 'react-native';
import { Props, Product } from '../../interfaces';
import { Colors, Card, alert } from '../../common';
import { CartService, OrderService } from '../../services';
import Button from '../../common/generalButton';

class Proceed extends Component<Props> {
    state : { address? : string, loading: boolean } = {
        loading : false
    }
    cartService = new CartService();
    orderService = new OrderService();

    /**
     * Handles what the user types in textbox
     * @param event
     */
    handleAddress(event: string){
        this.setState({
            address : event, // user types
        });
        // console.log(this.state.address);
    }

    /**
     * Renders a product in product list on order detail
     * @param param0 
     * @returns Row (JSX)
     */
    productRow = ({item}: any) => {
        return(<View style={styles.tableRowHeader}>
            <View style={styles.tableColumn}>
                <Text style={styles.headerColumn}>{item.name}</Text>
            </View>
            <View style={styles.tableColumn}>
                <Text style={styles.headerColumn}>x 1</Text>
            </View>
            <View style={styles.tableColumn}>
                <Text style={styles.headerColumn}>${item.price}</Text>
            </View>
        </View>);
    }

    /** Gets the key for each element in list with format id-index */
    keyExtractor = (item: Product, index: number) => `${index}-${item.id.toString()}`;

    buttonContent(){
        if(this.state.loading){
            return <ActivityIndicator color={'white'}></ActivityIndicator>
        }
        else {
            return <Text style={{color : this.state.address === undefined? Colors.darkGray : 'white', fontSize: 20,}}>Proceder</Text>
        }
    }

    generateOrder(){
        this.setState({
            loading : true
        })
        if(this.state.address){
            this.orderService.generateOrder(this.state.address).then( () => {
                this.cartService.deleteCart();
                alert({
                    title : 'Pedido',
                    message : 'Su orden ha sido generada, gracias',
                    options : [
                        {
                            style : 'cancel',
                            text : 'Ok',
                            onPress : () => { this.props.navigation.navigate('Index')}
                        },
                    ]
                })
            }).catch( err => {
                alert({
                    title : 'Pedido',
                    message : 'Tuvimos problemas para generar su orden, intente más tarde',
                    options : [
                        {
                            style : 'cancel',
                            text : 'Ok',
                        },
                    ]
                })
            }).finally( () => {
                this.setState({
                    loading : false
                })
            });
        }
    }

    render(){
        return(
            // <ScrollView>
            <View style={styles.screen_container}>
                <KeyboardAvoidingView style={styles.keyboardContainer}  behavior={'position'} keyboardVerticalOffset={undefined}>
                    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex : 1}}> */}
                    <View style={styles.innerContainer}>
                        <Card>
                            <Text style={styles.card_title}>Detalles del pedido</Text>
                        </Card>
                        <Card>
                            <View style={{height : 300}}>
                                <View style={styles.tableRowHeader}>
                                    <View style={styles.tableColumn}>
                                        <Text style={styles.headerColumn}>Nombre</Text>
                                    </View>
                                    <View style={styles.tableColumn}>
                                        <Text style={styles.headerColumn}>Cantidad</Text>
                                    </View>
                                    <View style={styles.tableColumn}>
                                        <Text style={styles.headerColumn}>Precio</Text>
                                    </View>
                                </View>
                                <FlatList style={{alignSelf : 'stretch'}}
                                        keyExtractor={this.keyExtractor}
                                        data={this.cartService.getCart().cart}
                                        renderItem={this.productRow}/>
                            </View>
                        </Card>
                        <Card>
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceTitle}>Total a pagar</Text>
                                <Text style={[styles.priceTitle,{color : Colors.red}]}>${this.cartService.getCart().total}</Text>
                            </View>
                        </Card>
                        
                        <Card style={{paddingLeft : 15,paddingRight : 15}}>
                            <Text style={styles.priceTitle}>Dirección de envío</Text>
                                <TextInput style={styles.input} placeholder="Dirección" multiline={true} numberOfLines={4} focusable={true} onChangeText={(ev) => this.handleAddress(ev)}></TextInput>
                        </Card>
                        <View style={{flex : 1, justifyContent : 'center'}}>
                            <Button disabled={this.state.address === undefined} style={styles.proceed} onPress={() => {this.generateOrder()}}>
                                {this.buttonContent()}
                            </Button>
                        </View>
                    </View>
                    {/* </TouchableWithoutFeedback> */}
                </KeyboardAvoidingView>
            </View>
            // </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    screen_container : {
        flex: 1,
        backgroundColor : Colors.backgroundBlue,
        padding : 10,
        // alignItems : 'center',
    },
    keyboardContainer : {
        flex : 1, alignItems : 'center'
    },
    innerContainer : {
        flex : 1,
        width : Dimensions.get('window').width - 10, //padding that is not count
    },
    card_title : {
        fontSize: 25,
        fontWeight: '500',
    },
    tableRowHeader : {
        display : 'flex',
        flexDirection : 'row',
        height : 40,
        borderBottomColor : Colors.darkGray,
        borderBottomWidth : 1
    },
    tableColumn : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    headerColumn : {
        fontSize: 15,
        fontWeight: '500',
    },
    priceContainer : {
        display : 'flex',
        flexDirection: 'row',
        justifyContent : 'space-between',
        paddingLeft : 15,
        paddingRight : 15
    },
    priceTitle : {
        fontSize: 20,
        fontWeight: '500',
    },
    input: {
        marginTop : 10,
        height: 100,
        alignSelf : 'stretch',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        fontSize: 15,
        paddingLeft: 10,
        paddingRight : 10,
        color: Colors.darkGray,
        textAlignVertical: 'top'
    },
    proceed : {
        backgroundColor: Colors.bluePrimary,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Proceed;