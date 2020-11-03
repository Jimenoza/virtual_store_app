/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  ImageBackground
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex:1}}>
        <ImageBackground source={require('./assets/images/banner2.png')} style={styles.container}>
          <Text style={styles.logo}>
            Tienda Virtual
          </Text>
          <TextInput style={styles.input} placeholder="Usuario"/>
          <TextInput style={styles.input} placeholder="Contraseña"/>
          <Button title="Ingresar" color="#0e8ce4"></Button>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

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
  }
});

export default App;
