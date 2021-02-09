import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, } from '@react-navigation/drawer';

class SideMenu extends Component{
    render () {
        return (
          <DrawerContentScrollView {...this.props}>
              <View style={styles.user}>
                <Text style={styles.userName}>
                  Hola Usuario
                </Text>
              </View>
              <View>
                <Text>
                  Section 1
                </Text>
                <View>
                  <Text>
                  Page1
                  </Text>
                </View>
              </View>
              <View>
                <Text>
                  Section 2
                </Text>
                <View>
                  <Text>
                    Page2
                  </Text>
                  <Text>
                    Page3
                  </Text>
                </View>
              </View>
            <View>
              <Text>This is my fixed footer</Text>
            </View>
          </DrawerContentScrollView>
        );
      }
}

const styles = StyleSheet.create({
  user : {
    alignSelf: 'stretch',
    backgroundColor: 'red',
    height: 40,
    justifyContent: 'center'
  },
  userName : {
    fontSize: 25,
    fontStyle: 'italic',
    paddingLeft: 15,
  }

})

export default SideMenu;