import React from 'react';
import { Text, StyleSheet, TouchableHighlight, ActivityIndicator} from 'react-native';
import { Colors } from './styles';

function ActionButton(props: any){
    // console.log(props);
    const buttonStyles = [styles.item_add,props.style];
    let buttonContent = <Text style={styles.item_add_text}>{props.enabledLabel}</Text>;
    if(props.disabled){
        buttonContent = <Text style={styles.item_add_text}>{props.disabledLabel}</Text>;
        buttonStyles.push({backgroundColor: Colors.red,})
    }
    else if(props.loading){
        buttonContent = <ActivityIndicator animating={true} color='white'></ActivityIndicator>;
    }
    return (
        <TouchableHighlight style={buttonStyles} underlayColor={Colors.darkBlue} onPress={!props.disabled ? props.onPress : null}>
            {buttonContent}
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
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
    },
});

export default ActionButton;