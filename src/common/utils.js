import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export function replace_host(url){
    if ( Platform.OS === 'android'){
        return url.replace('localhost','10.0.2.2');
    }
    return url;
}

export function displayStars(rate,size=40){
    const stars = [];
    const integer = Math.trunc(rate);
    for( let i = 0; i < integer; i++){
        stars.push(
                <Icon name='star' color='#f5e211' size={size} key={i}/>
        )
    }
    if( (rate - integer) >= 0.5 ){
        stars.push(
                <Icon name='star_half' color='#f5e211' size={30} key={5}/>
        )
    }
    return (<View style={{alignItems : 'flex-start', flexDirection:'row'}}>
                {stars}
            </View>);
}

export function Card(props){
    return (
        <View style={styles.section_container}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    section_container : {
        backgroundColor: 'white',
        // justifyContent: 'center',
        // marginTop: 40,
        padding: 5,
        borderRadius: 10,
        marginBottom: 25,
    }
})