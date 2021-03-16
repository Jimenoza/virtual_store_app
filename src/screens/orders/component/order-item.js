import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {replace_host} from '../../../common/utils';
import { Colors } from '../../../common/styles';

function OrderItem(item=null){
    const billId = `${item.id}`.padStart(8,'0');
    return (
        <TouchableHighlight underlayColor="white" onPress={item.onPress}>
            <View style={styles.item_container}>
                <View style={styles.item_content}>
                    <Text style={styles.item_cat}>
                        {billId}
                    </Text>
                    <Text style={styles.item_name}>
                        Fecha: {item.date}
                    </Text>
                    <Text style={styles.item_price}>
                        Total: ${item.total}
                    </Text>
                    <Text style={styles.item_name}>
                        Enviado a: {item.address}
                    </Text>
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
    item_content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
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
})

export default OrderItem;