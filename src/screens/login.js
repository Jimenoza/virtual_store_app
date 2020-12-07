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
import App from './app';

class LoginScreen extends Component {
  loginGuest = () => {
    this.props.navigation.navigate('Details');
  }
  render() {
    return (
        <View style={{flex:1}}>
            <ImageBackground source={require('../../assets/images/banner.jpeg')} style={styles.container}>
            <Text style={styles.logo}>
              Tienda Virtual
            </Text>
            <TextInput style={styles.input} placeholder="Usuario"/>
            <TextInput style={styles.input} placeholder="Contraseña"/>
            <TouchableHighlight style={styles.login} underlayColor="#08609e" onPress={ () => { alert('Login!')}}>
              <Text style={styles.text}>Ingresar</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.login} underlayColor="#08609e" onPress={ () => { alert('Registered')}}>
              <Text style={styles.text}>Registrarme</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.guest} underlayColor="#08609e" onPress={ () => { this.loginGuest()}}>
              <Text style={styles.textGuest}>Invitado</Text>
            </TouchableHighlight>
          </ImageBackground>
        </View>
    )
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
      fontSize: 36,
      fontWeight: '500',
      fontFamily: 'Rubik',
      color: '#0e8ce4'
    },
    input: {
      height: 50,
      width: 350,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      backgroundColor: 'white',
      fontSize: 20,
    },
    login : {
      backgroundColor: '#0e8ce4',
      width:200,
      height: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },
    text : {
      fontSize: 18,
      color: 'white'
    },
    guest : {
      backgroundColor: '#0e8ce4',
      width:150,
      height: 37.5,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textGuest : {
      fontSize: 14,
      color: 'white'
    }
  });

export default LoginScreen;