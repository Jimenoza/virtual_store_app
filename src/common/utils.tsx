import React from 'react';
import { Platform, View, StyleSheet, TextInput,Text,KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from './styles';

export function replace_host(url: string){
    if ( Platform.OS === 'android'){
        return url.replace('localhost','10.0.2.2');
    }
    return url;
}

export function Stars(props: {rate: number, size?: number}, size=40){
    const stars = [];
    const integer = Math.trunc(props.rate);
    for( let i = 0; i < integer; i++){
        stars.push(
                <Icon name='star' color={Colors.yellow} size={props.size} key={i}/>
        )
    }
    if( (props.rate - integer) >= 0.5 ){
        stars.push(
                <Icon name='star-half' color={Colors.yellow} size={props.size} key={5}/>
        )
    }
    return (<View style={{alignItems : 'flex-start', flexDirection:'row'}}>
                {stars}
            </View>);
}

export function Card(props: any){
    return (
        <View style={[styles.section_container,props.style]}>
            {props.children}
        </View>
    )
}

function getBehavior(): 'padding' | null{
    if( Platform.OS === 'ios' ){
        return 'padding';
    }
}

export function BottomInputRate(props : any){
    const input = <View style={{height : 50}}>
                    <View style={styles.input_container}>
                        <View style={styles.input_sub_container}>
                            <TextInput style={styles.input} placeholder='Comentario...' autoFocus={props.focus} onChangeText={props.callBackText}/>
                            <Text style={styles.rate}>Reseñas</Text>
                        </View>
                    </View>
                </View>
    
    if(props.display){
        return(
            <KeyboardAvoidingView style={{flex : 1}} behavior={getBehavior()} keyboardVerticalOffset={120}>
                {props.children}
                {input}
            </KeyboardAvoidingView>
        )
    }
    else {
        return(
            <KeyboardAvoidingView style={{flex : 1}} behavior={getBehavior()} keyboardVerticalOffset={120}>
                {props.children}
            </KeyboardAvoidingView>
        )
    }
}

export function SeparatorLine(style){
    return <View style={styles.separator}></View>
}

const styles = StyleSheet.create({
    section_container : {
        backgroundColor: 'white',
        // justifyContent: 'center',
        // marginTop: 40,
        padding: 5,
        borderRadius: 10,
        marginBottom: 25,
    },
    input_container : {
        // alignSelf: 'flex-end',
        justifyContent: 'center',
        backgroundColor: Colors.lightGray,
        padding:10,
        flex: 1,
    },
    input_sub_container : {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    rate : {
        borderRadius: 10,
        alignSelf: 'center',
        flex: 1,
        fontSize: 15,
    },
    input : {
        flex:3,
        borderRadius: 10,
        height: 25,
        width: 300,
        backgroundColor: 'white',
        fontSize: 15,
        padding: 0,
        paddingLeft: 10,
    },
    separator: {
        marginTop: 10,
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
    }
})