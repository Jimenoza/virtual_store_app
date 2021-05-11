import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { DrawerContentScrollView, createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import {Icon} from 'react-native-elements';
import { Colors } from '../common/styles';
import { ProductService } from '../services/products-service';
import { Props } from '../interfaces';

const Drawer = createDrawerNavigator();

class SideMenu extends Component<Props>{
  currentCategoryIcon = 'keyboard-arrow-down';
  isCategoryOpen = false;
  service = ProductService.getService() as ProductService;

  toggleCategories(){
    this.isCategoryOpen = !this.isCategoryOpen;
    if(this.isCategoryOpen){
      this.currentCategoryIcon = 'keyboard-arrow-up';
    }
    else {
      this.currentCategoryIcon = 'keyboard-arrow-down';
    }
  }

  render () {
    return (
      <DrawerContentScrollView {...this.props} style={styles.background}>
          <View style={styles.user}>
            <Text style={styles.userName}>
              Hola Usuario
            </Text>
          </View>
          <TouchableHighlight underlayColor={Colors.bluePrimary} onPress={ () => { this.props.navigation.navigate("Index")}}>
            <View style={styles.option}>
              <Text style={styles.optionText}>
              Inicio
              </Text>
              <Icon name='shopping-bag' color='black' size={25} style={styles.icon}/>
            </View>
          </TouchableHighlight>

          <TouchableHighlight underlayColor={Colors.bluePrimary} onPress={() => { this.props.navigation.navigate("Orders")}}> 
            <View style={styles.option}>
              <Text style={styles.optionText}>
              Mis órdenes
              </Text>
              <Icon name='inventory' color='black' size={25} style={styles.icon}/>
            </View>
          </TouchableHighlight>

          <TouchableHighlight underlayColor={Colors.bluePrimary} onPress={ () => { this.props.navigation.navigate('Categories')}}>
            <View style={styles.option}>
              <Text style={styles.optionText}>
              Categorías
              </Text>
              <Icon name='category' color='black' size={25} style={styles.icon}/>
            </View>
          </TouchableHighlight>  

          <TouchableHighlight underlayColor={Colors.bluePrimary} onPress={ () => {this.props.navigation.navigate("login")}}>
            <View style={styles.option}>
              <Text style={styles.optionText}>
              Iniciar Sesión
              </Text>
              <Icon name='login' color='black' size={25} style={styles.icon}/>
            </View>
          </TouchableHighlight>

          <TouchableHighlight underlayColor={Colors.bluePrimary} onPress={ () => {
            this.service.deleteProducts();
            this.props.navigation.navigate("login")
            }}>
            <View style={styles.option}>
              <Text style={styles.optionText}>
                Salir
              </Text>
              <Icon name='exit-to-app' color='black' size={25} style={styles.icon}/>
            </View>
          </TouchableHighlight>

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