import React,{ Component, ReactNode } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Props} from '../../interfaces';

export class ModalCard extends Component<Props>{

    styles = StyleSheet.create({
        section_container : {
            backgroundColor: 'white',
            borderRadius: 10,
        },
    });

    content(): ReactNode{
        return <View></View>
    }

    render(){
        return (
            <View style={this.styles.section_container}>
                {this.content()}
            </View>
        );
    }
}