import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import { NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/login';
import Header from './src/common/header';
import DetailsScreen from './src/screens/index/index';

const stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
        <stack.Navigator initialRouteName="login">
          <stack.Screen name="login" component={LoginScreen}></stack.Screen>
          <stack.Screen name="Details" component={DetailsScreen}></stack.Screen>
        </stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
