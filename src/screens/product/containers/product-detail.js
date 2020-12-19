import React, { Component } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import { replace_host } from '../../../common/utils';

const image = "http://localhost:8000/images/productos/1602557763.jpg";

class ProductDetail extends Component{
    render(){
        return (
            <View style={styles.screenContainer}>
                <View style={styles.generalContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: replace_host(image)
                            }}
                        />
                    </View>
                </View>
            </View>  
        );
    }
}

const styles = StyleSheet.create({
    screenContainer : {
        backgroundColor : '#eff6fa',
        flex: 1,
    },
    generalContainer : {
        paddingTop: 20,
        paddingRight: 15,
        paddingLeft: 15,
    },
    imageContainer : {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 450,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e8e8e8',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    image : {
        width: 450,
        height: 400,
        resizeMode: 'contain',
    }
})

export default ProductDetail;