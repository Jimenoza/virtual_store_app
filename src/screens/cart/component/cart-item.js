import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {replace_host} from '../../../common/utils';

function CartItem(item=null){
    return (
        <TouchableHighlight onPress={item.onPress} underlayColor="white">
            <View style={styles.item_container}>
                <Image
                    style={styles.item_image}
                    source={{
                        uri: replace_host(item.image)
                    }}
                />
                <View style={styles.item_content}>
                    <Text style={styles.item_cat}>
                        En {item.category_name}
                    </Text>
                    <Text style={styles.item_name}>
                        {item.name}
                    </Text>
                    <Text style={styles.item_price}>
                        ${item.price}
                    </Text>
                    <Text style={styles.item_name}>
                        Cantidad: 1
                    </Text>
                </View>
                <View style={styles.cancel_container}>
                    <TouchableHighlight style={styles.item_remove} underlayColor="#08609e">
                        <Text style={styles.item_remove_text}>X</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item_container : {
        borderRadius: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: 115,
        flex: 1,
    },
    item_image : {
        flex: 1,
        height: 115,
        width: 115,
        resizeMode: 'contain'
    },
    item_content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
    },
    item_cat : {
        fontSize: 12,
        color: '#949494'
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
    item_remove : {
        backgroundColor: '#858585',
        width:50,
        height: 37.5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_remove_text : {
        fontSize: 14,
        color: 'white'
    },
    cancel_container : {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
    }
})

export default CartItem;