import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Colors} from './styles'

function AppModal(props){
    return (
        <View style={styles.touchableBackground}>
        </View>
    )
}

const styles = StyleSheet.create({
    touchableBackground : {
        // position : 'absolute',
        flex : 1,
        backgroundColor : Colors.darkGrayTranslucid,
        zIndex: 100,
    }
})

export default AppModal;