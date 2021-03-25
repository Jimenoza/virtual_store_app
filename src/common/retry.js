import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from './styles';

function RetryMessage(props){
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={props.action}>
                <View style={styles.centerMessage}>
                    <Icon name="update" size={40} color={Colors.bluePrimary}></Icon>
                    <Text style={styles.message}>Intentar de nuevo</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    centerMessage : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    message : {
        fontSize : 20,
        color : Colors.bluePrimary
    }
});

export default RetryMessage;