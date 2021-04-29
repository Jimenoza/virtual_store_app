import React, {ReactElement} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, GestureResponderEvent} from 'react-native';
import {replace_host} from '../../../common/utils';
import { Colors } from '../../../common/styles';
import { Order } from '../../../services/interfaces/order-interfaces';

interface Props {
    item: Order,
    onPress: (event: GestureResponderEvent) => void
}

function OrderItem(props: Props): ReactElement{
    const billId = `${props.item.id}`.padStart(8,'0');
    return (
        <TouchableHighlight underlayColor="white" onPress={props.onPress}>
            <View style={styles.item_container}>
                <View style={styles.item_content}>
                    <Text style={styles.item_cat}>
                        {billId}
                    </Text>
                    <Text style={styles.item_name}>
                        Fecha: {props.item.date}
                    </Text>
                    <Text style={styles.item_price}>
                        Total: ${props.item.total}
                    </Text>
                    <Text style={styles.item_name}>
                        Enviado a: {props.item.address}
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