import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';

function setIcon(icon){
    
}

class Header extends Component{
    getIcon() {
        if( this.props.navigation.dangerouslyGetState().index > 1){
            return <Icon name='arrow-back' color='black' size={40} onPress={() => this.props.navigation.goBack()}/>
        }
        else{
            return <Icon name='menu' color='black' size={40}/>
        }
    }

    goToCart = () => {
        this.props.navigation.navigate('Cart');
    }

    goToSearch = () => {
        this.props.navigation.navigate('Search');
    }

    render(){
        // console.log(this.props.navigation.dangerouslyGetState());
        return (
            <View>
                <View style={styles.header_container}>
                    <View style={styles.column_header}>
                        <View style={styles.header}>
                            <View style={styles.logo_container}>
                                <TouchableWithoutFeedback style={{flex : 1}}>
                                    <View>
                                        {this.getIcon()}
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback style={{flex : 1}} onPress={this.goToSearch} underlayColor="rgba(0,0,0,0.4)">
                                    <View style={{flex : 1, flexDirection: 'row'}}>
                                        <Text style={styles.logo}>Tienda Virtual</Text>
                                        <Icon name='search' color='black' size={40}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <TouchableWithoutFeedback onPress={this.goToCart} underlayColor="rgba(0,0,0,0.4)">
                                <View style={styles.cart_container}>
                                    <Image source={require('../../assets/images/cart.png')}></Image>
                                    <View style={styles.count_container}>
                                        <Text style={styles.cart_size}>0</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header_container : {
        height: 72,
        backgroundColor: 'white'
    },
    column_header : {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 15,
    },
    header : {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo_container: {
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    logo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0e8ce4',
    },
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    cart_container: {
        width: 40
    },
    count_container: {
        width: 23,
        height: 23,
        backgroundColor: '#0e8ce4',
        borderRadius: 50,
        position: 'absolute',
        bottom: 6,
        right: 6,
        textAlign: 'center'
    },
    cart_size: {
        lineHeight: 21,
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    }
})

export default Header;
