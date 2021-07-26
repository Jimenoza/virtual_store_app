import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    ImageBackground,
    TextInputSubmitEditingEventData
} from 'react-native';
import { Colors, alert } from '../../common';
import {Props} from '../../interfaces';
import { UserService } from '../../services';

export default class Register extends Component<Props>{
    render(){
        return (
            <View>
                <Text>Hola mundo</Text>
            </View>
        );
    }
}