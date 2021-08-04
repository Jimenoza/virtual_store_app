import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from './styles';
import { Icon } from 'react-native-elements';

interface Props {
    message : string,
    iconName : string
}

const ScreenMessage = (props: Props) => {
    return(
        // <Text>No hay productos</Text>
        <View style={styles.messageContainer}>
            <Icon name={props.iconName} size={40} color={Colors.bluePrimary}></Icon>
            <View style={{width : 250}}>
                <Text style={{ fontSize : 20, textAlign: 'center', fontFamily : 'Rubik'}}>{props.message}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default ScreenMessage;
        