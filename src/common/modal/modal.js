import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Colors} from '../styles'
import ErrorModalCard from './modal-cards/error-modal-card';

function AppModal(props){
    const cards = {
        error : <ErrorModalCard {...props}></ErrorModalCard>
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
})

export default AppModal;