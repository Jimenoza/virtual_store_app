import React,{ Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';

export class ModalCard extends Component{

    styles = StyleSheet.create({
        section_container : {
            backgroundColor: 'white',
            borderRadius: 10,
        },
    });

    content(){}

    render(){
        return (
            <View style={this.styles.section_container}>
                {this.content()}
            </View>
        );
    }
}