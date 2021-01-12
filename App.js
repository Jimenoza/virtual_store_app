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
import Index from './src/screens/index/index';
import Header from './src/common/header';
import ProductDetail from './src/screens/product/containers/product-detail';
import CartList from './src/screens/cart/container/cart-list';
import SearchScreen from './src/screens/search/containers/search-screen'


const stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex:1}}>
        <StatusBar barStyle="dark-content" />
          <stack.Navigator screenOptions={{ header: (props) => <Header {...props}/>}} initialRouteName="login">
            <stack.Screen name="login" component={LoginScreen} options={{headerShown : false}}></stack.Screen>
            <stack.Screen name="Index" component={Index} options={{gestureEnabled: false}} ></stack.Screen>
            <stack.Screen name="Details" component={ProductDetail}></stack.Screen>
            <stack.Screen name="Cart" component={CartList}></stack.Screen>
            <stack.Screen name="Search" component={SearchScreen}></stack.Screen>
          </stack.Navigator>
        </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
