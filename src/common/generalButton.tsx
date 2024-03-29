import React from 'react';
import { Text, StyleSheet, TouchableHighlight, GestureResponderEvent, StyleProp} from 'react-native';
import { Colors } from './styles';

interface Props {
    style? : any,
    children: JSX.Element,
    onPress?: (event: GestureResponderEvent) => void,
    disabled : boolean,
    underlayColor?: any,
}

function Button(props: Props) {
    const stylesState: any[] = [styles.navButton]
    if(props.disabled){
        stylesState.push(styles.inactive);
    }
    else {
        stylesState.push(styles.active); 
    }
    if(props.style){
        stylesState.push(props.style);
        if(props.disabled){
            stylesState.push(styles.inactive);
        }
    }
    return (
        <TouchableHighlight style={stylesState} underlayColor={props.underlayColor ? props.underlayColor : Colors.underlayLightBlue} onPress={props.onPress} disabled={props.disabled}>
            {props.children}
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    navButton : {
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        borderRadius: 5,
        // flex: 1,
        alignItems : 'center'
    },
    inactive : {
        backgroundColor : Colors.lightGray,
        borderColor: Colors.lightGray,
        color : Colors.disabled,
    },
    active : {
        borderColor: Colors.bluePrimary,
        color : Colors.bluePrimary,
        backgroundColor: 'white'
    },
});

export default Button;