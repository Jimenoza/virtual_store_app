import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, ActivityIndicator, GestureResponderEvent} from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from './styles';

function RetryMessage(props: { loading: boolean, action?: (event: GestureResponderEvent) => void}){
    if(props.loading){
        return (
            <View style={styles.centerLoader}>
                <ActivityIndicator size='large' color={Colors.bluePrimary} animating={true}/>
            </View>
        )
    }
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
    },
    centerLoader : {
        marginTop: 20,
        justifyContent: 'center',
        flex: 1,
    },
});

export default RetryMessage;