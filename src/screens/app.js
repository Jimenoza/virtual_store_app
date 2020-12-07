import React, { Component } from 'react';
import Header from '../common/header';
import { StatusBar, SafeAreaView, View} from 'react-native';

class App extends Component {
  render() {
    return (
        <SafeAreaView style={{flex:1}}>
          <View>
            <Header/>
          </View>
          {this.props.children}
        </SafeAreaView>)
  }
}

export default App;