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
import Header from './src/screens/header';
import ProductDetail from './src/screens/product/screens/product-screen';
import CartList from './src/screens/cart/screens/cart-screen';
import SearchScreen from './src/screens/search/containers/search-screen'
import SideMenu from './src/screens/side-menu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Category from './src/screens/categories/screens/categories-screen';
import Orders from './src/screens/orders/screens/orders-screen';
import Proceed from './src/screens/cart/screens/proceed-screen';
import OrderDetail from './src/screens/orders/screens/order-detail-screen';
import AppModal from './src/common/modal/modal';
import Register from './src/screens/register/register';
import { PersistGate } from 'redux-persist/integration/react'
import { combinedStores, combinedPersitors } from './src/redux';
import { Provider } from 'react-redux'
import { UserService } from './src/services';

const user = () => {
  const user = new UserService().getUser();
  return user;
}

const Drawer = createDrawerNavigator();
const navigatorStack = createStackNavigator();
const modalStack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <Provider store={combinedStores}>
      <PersistGate persistor={combinedPersitors} loading={null}>
        <NavigationContainer>
          <ModalNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

function StackNavigator({navigation}){
  const initialRoute = user();
  const protectedRoutes = (isUser) => {
    if(isUser){
      return (
        <>
        <navigatorStack.Screen name="Orders" component={Orders} options={{gestureEnabled: false}}></navigatorStack.Screen>
        <navigatorStack.Screen name="OrderDetail" component={OrderDetail}></navigatorStack.Screen>
        <navigatorStack.Screen name="Proceed" component={Proceed}></navigatorStack.Screen>
        </>
      );
    }
  }
  const mainScreens = (isUser) => {
    if(isUser){
      return(
      <>
      <navigatorStack.Screen name="Index" component={Index} options={{gestureEnabled: false}} ></navigatorStack.Screen>
      <navigatorStack.Screen name="login" component={LoginScreen} options={{headerShown : false}}></navigatorStack.Screen>
      </>)
    }
    else {
      return(
        <>
        <navigatorStack.Screen name="login" component={LoginScreen} options={{headerShown : false}}></navigatorStack.Screen>
        <navigatorStack.Screen name="Index" component={Index} options={{gestureEnabled: false}} ></navigatorStack.Screen>
        </>)
    }
  }
  return (
      <SafeAreaView style={{flex:1}}>
        <StatusBar barStyle="dark-content" />
          <navigatorStack.Navigator screenOptions={{ header: (props) => <Header {...props}/>}}>
            {mainScreens(user())}
            <navigatorStack.Screen name="Details" component={ProductDetail}></navigatorStack.Screen>
            <navigatorStack.Screen name="Cart" component={CartList}></navigatorStack.Screen>
            <navigatorStack.Screen name="Search" component={SearchScreen}></navigatorStack.Screen>
            <navigatorStack.Screen name="Categories" component={Category} options={{gestureEnabled: false}}></navigatorStack.Screen>
            <navigatorStack.Screen name="Register" component={Register} options={{headerShown : false}}></navigatorStack.Screen>
            {protectedRoutes(user())}
          </navigatorStack.Navigator>
        </SafeAreaView>
    
  );
}

function ModalNavigator({navigation}){
  return(
    <modalStack.Navigator mode="modal" screenOptions={{ cardStyle : {backgroundColor : 'transparent'}}}>
      <modalStack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }}/>
      <modalStack.Screen name="Modal" component={AppModal} options={{ headerShown: false }}/>
    </modalStack.Navigator>
  );
}

function DrawerNavigator({navigation, route}) {
  return (
    <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />}>
      {/* <Drawer.Screen name="ModalStack" component={ModalNavigator} /> */}
      <Drawer.Screen name="Stack" component={StackNavigator} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
