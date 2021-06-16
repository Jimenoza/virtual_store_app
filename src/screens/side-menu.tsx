import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { DrawerContentScrollView, createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import {Icon} from 'react-native-elements';
import { Colors } from '../common/styles';
import { Props } from '../interfaces';
import { UserService, ProductService } from '../services';
import { CommonActions, StackActions } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

class SideMenu extends Component<DrawerContentComponentProps<DrawerContentOptions>>{
  currentCategoryIcon = 'keyboard-arrow-down';
  isCategoryOpen = false;
  // service = ProductService.getService() as ProductService;
  service = new UserService();

  navigate(screen : string){
    // console.log('side menu:',this.props.navigation.dangerouslyGetState());
    // this.props.navigation.dispatch(CommonActions.reset({
    //   index : 0,
    //   key : undefined,
    //   routes : [
    //     {name : screen}
    //   ]
    // }))
    console.log(this.props.state);
    this.props.navigation.navigate(screen, { allowGoBack : false});
  }

  toggleCategories(){
    this.isCategoryOpen = !this.isCategoryOpen;
    if(this.isCategoryOpen){
      this.currentCategoryIcon = 'keyboard-arrow-up';
    }
    else {
      this.currentCategoryIcon = 'keyboard-arrow-down';
    }
  }

  displayUserName(): string{
    let saludo: string;
    if(this.service.userHasLoggedIn()){
      saludo = `Hola ${this.service.getUser()?.name}`;
    }
    else{
      saludo = 'Bienvenido'
    }
    return saludo;
  }

  displayOrderOptions(){
    if(this.service.userHasLoggedIn()){
      return (
        <TouchableHighlight underlayColor={Colors.bluePrimary} onPress={() => { this.navigate("Orders")}}> 
          <View style={styles.option}>
            <Text style={styles.optionText}>
            Mis órdenes
            </Text>
            <Icon name='inventory' color='black' size={25} style={styles.icon}/>
          </View>
        </TouchableHighlight>
      );
    }
  }

  displayLoginOptions(){
    let content = this.service.userHasLoggedIn()? 'Salir' : 'Iniciar Sesión';
    let icon = this.service.userHasLoggedIn()? 'exit-to-app' : 'login';
    return (
      <TouchableHighlight underlayColor={Colors.bluePrimary} onPress={ () => {
        // this.service.deleteProducts();
        this.navigate("login")
        }}>
        <View style={styles.option}>
          <Text style={styles.optionText}>
          {content}
          </Text>
          <Icon name={icon} color='black' size={25} style={styles.icon}/>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <DrawerContentScrollView {...this.props} style={styles.background}>
          <View style={styles.user}>
            <Text style={styles.userName}>
              {this.displayUserName()}
            </Text>
          </View>
          <TouchableHighlight underlayColor={Colors.bluePrimary} onPress={ () => { this.navigate("Index")}}>
            <View style={styles.option}>
              <Text style={styles.optionText}>
              Inicio
              </Text>
              <Icon name='shopping-bag' color='black' size={25} style={styles.icon}/>
            </View>
          </TouchableHighlight>

          {this.displayOrderOptions()}

          <TouchableHighlight underlayColor={Colors.bluePrimary} onPress={ () => { this.navigate('Categories')}}>
            <View style={styles.option}>
              <Text style={styles.optionText}>
              Categorías
              </Text>
              <Icon name='category' color='black' size={25} style={styles.icon}/>
            </View>
          </TouchableHighlight>  

          {this.displayLoginOptions()}

      </DrawerContentScrollView>
    );
  }
}

const styles = StyleSheet.create({
  background : {
    backgroundColor: Colors.backgroundBlue,
  },
  user : {
    alignSelf: 'stretch',
    height: 40,
    justifyContent: 'center'
  },
  userName : {
    fontSize: 20,
    fontStyle: 'italic',
    paddingLeft: 15,
    fontWeight: 'bold',
  },
  option : {
    backgroundColor: 'white',
    height: 50,
    paddingLeft: 20,
    justifyContent: 'space-between',
    // marginBottom: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
    
  },
  optionText : {
    fontSize: 15,
  },
  icon : {
    marginRight: 20,
  }

})

export default SideMenu;