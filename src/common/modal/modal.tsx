import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from '../styles'
import ErrorModalCard from './modal-cards/error-modal-card';
import { Props } from '../../interfaces';

function AppModal(props: Props){
    const cards: {[name : string] : Element} = {
        error : <ErrorModalCard {...props}>
                    <Text style={styles.message}>Lo sentimos. Hubo un error al establecer conexión con el servidor</Text>
                    <Text style={styles.message}>Intente más tarde</Text>
                </ErrorModalCard>,
        login : <ErrorModalCard {...props}>
                    <Text style={styles.message}>{props.route.params.content}</Text>
                </ErrorModalCard>
    }
    return (
        <View style={styles.touchableBackground}>
            <View>
                {cards[props.route.params.message]}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    touchableBackground : {
        // position : 'absolute',
        flex : 1,
        backgroundColor : Colors.darkGrayTranslucid,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message : {
        textAlign : 'center'
    },
})

export default AppModal;