import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { DrawerContentScrollView, } from '@react-navigation/drawer';

class SideMenu extends Component{
    render () {
        return (
          <DrawerContentScrollView {...this.props}>
            <ScrollView>
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
            </ScrollView>
            <View>
              <Text>This is my fixed footer</Text>
            </View>
          </DrawerContentScrollView>
        );
      }
}

export default SideMenu;