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
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import Home from './src/screens/home';
import LoginScreen, {} from './src/screens/login';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Home>
        <SafeAreaView style={{flex:1}}>
          <LoginScreen/>
        </SafeAreaView>
      </Home>
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

export default App;
