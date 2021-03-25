import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {ModalCard} from '../modal-card';
import { Icon } from 'react-native-elements';
import {Colors} from '../../styles';

class ErrorModalCard extends ModalCard{
    content(){
        return (
            <View style={styles.squareContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="error" size={50} color={Colors.bluePrimary}></Icon>
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Lo sentimos. Hubo un error al establecer conexión con el servidor</Text>
                    <Text style={styles.message}>Intente más tarde</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={styles.button} underlayColor={Colors.darkBlue} onPress={() => {this.props.navigation.goBack()}}>
                        <Text style={styles.buttonLabel}>Aceptar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    squareContainer : {
        width : 250,
        height: 250,
        flexDirection : 'column',
    },
    buttonContainer : {
        flex : 1,
        justifyContent : 'flex-end'
    },
    button : {
        backgroundColor : Colors.bluePrimary,
        alignSelf : 'stretch',
        height: 50,
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
        justifyContent : 'center'
    },
    buttonLabel : {
        color : 'white',
        fontSize : 20,
        textAlign : 'center',
    },
    messageContainer : {
        flex : 1,
    },
    message : {
        textAlign : 'center'
    },
    iconContainer : {
        flex : 1,
        marginTop : 20,
    }
    
});

export default ErrorModalCard;

