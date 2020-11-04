import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    ImageBackground
  } from 'react-native';

class Login extends Component {
  render() {
    return (<SafeAreaView style={{flex:1}}>
          <ImageBackground source={require('../../assets/images/banner.jpeg')} style={styles.container}>
            <Text style={styles.logo}>
              Tienda Virtual
            </Text>
            <TextInput style={styles.input} placeholder="Usuario"/>
            <TextInput style={styles.input} placeholder="Contraseña"/>
            <View>
              <TouchableHighlight>Ingresar</TouchableHighlight>
            </View>
          </ImageBackground>
        </SafeAreaView>)
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    logo : {
      height: 72,
      fontSize: 24,
      color: '#0e8ce4'
    },
    input: {
      height: 50,
      width: 350,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      backgroundColor: 'white'
    },
    button : {
      backgroundColor: '#0e8ce4'
    }
});

export default Login;