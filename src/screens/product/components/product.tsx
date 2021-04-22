import React, {ReactElement} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, GestureResponderEvent } from 'react-native';
import {replace_host, Stars} from '../../../common/utils';
import { Colors } from '../../../common/styles';
import ActionButton from '../../../common/actionButton';
import { Product as ProductInterface} from '../../../services/product-interfaces';

interface ProductParams {
    prod : ProductInterface,
    onPress: (event: GestureResponderEvent) => void,
    onPressAdd: Function,
}

function Product(item : ProductParams): ReactElement{
    return (
        <TouchableHighlight onPress={item.onPress} style={styles.container} underlayColor="white">
            
                <View style={styles.item_container}>
                    <Image
                        style={styles.item_image}
                        source={{
                            uri: replace_host(item.prod.image)
                        }}
                    />
                    <View style={styles.item_content}>
                        <View style={{flexDirection : 'row'}}>
                            <Text style={styles.item_cat}>
                                En {item.prod.category_name}
                            </Text>
                            <Stars rate={item.prod.average} size={15}/>
                        </View>
                        <Text style={styles.item_name}>
                            {item.prod.name}
                        </Text>
                        <Text style={styles.item_price}>
                            ${item.prod.price}
                        </Text>
                        <ActionButton 
                            onPress={item.onPressAdd}
                            enabledLabel={'Agregar al Carrito'}
                            disabledLabel={'Agotado'}
                            disabled={item.prod.stock === 0}
                            loading={item.prod.loading}
                        />
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