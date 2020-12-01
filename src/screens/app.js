import React, { Component } from 'react';
import { StatusBar, SafeAreaView} from 'react-native';

class App extends Component {
  render() {
    return (
      
        <SafeAreaView style={{flex:1}}>
          {this.props.children}
        </SafeAreaView>)
  }
}

export default App;