import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ActivityIndicator} from 'react-native';
import {replace_host, Stars} from '../../../common/utils';
import { Colors } from '../../../common/styles';

function Product(item=null){
    // console.log(item);
    const button = () => {
        const buttonStyles = [styles.item_add];
        let buttonContent = <Text style={styles.item_add_text}>Agregar a carrito</Text>;
        if(item.stock === 0){
            buttonContent = <Text style={styles.item_add_text}>Agotado</Text>;
            buttonStyles.push({backgroundColor: Colors.red,})
        }
        else if(item.loading){
            buttonContent = <ActivityIndicator animating={true} color='white'></ActivityIndicator>;
        }
        return (
            <TouchableHighlight style={buttonStyles} underlayColor={Colors.darkBlue} onPress={item.stock ? item.onPressAdd : null}>
                {buttonContent}
            </TouchableHighlight>
        )
    }
    return (
        <TouchableHighlight onPress={item.onPress} style={styles.container} underlayColor="white">
            
                <View style={styles.item_container}>
                    <Image
                        style={styles.item_image}
                        source={{
                            uri: replace_host(item.image)
                        }}
                    />
                    <View style={styles.item_content}>
                        <View style={{flexDirection : 'row'}}>
                            <Text style={styles.item_cat}>
                                En {item.category_name}
                            </Text>
                            <Stars rate={item.average} size={15}/>
                        </View>
                        <Text style={styles.item_name}>
                            {item.name}
                        </Text>
                        <Text style={styles.item_price}>
                            ${item.price}
                        </Text>
                        {button(item)}
                    </View>
                </View>
            
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white',
        width: 380,
        height: 150,
        marginTop: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_container : {
        backgroundColor: 'white',
        borderRadius: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: 115
    },
    item_image : {
        height: 115,
        width: 115,
        resizeMode: 'contain'
    },
    item_content: {
        justifyContent: 'space-between',
        paddingLeft: 25,
    },
    item_cat : {
        fontSize: 12,
        color: Colors.gray
    },
    item_name : {
        fontSize: 16,
        fontWeight: '400',
        color: 'black'
    },
    item_price : {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    item_add : {
        backgroundColor: Colors.bluePrimary,
        width:150,
        height: 37.5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_add_text : {
        fontSize: 14,
        color: 'white'
    }
})

export default Product;