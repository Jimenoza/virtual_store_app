import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
// import App from '../app';
import Product from '../product/components/product';
import ProductList from '../product/containers/product-list'
// import Header from '../../common/header';

class Index extends Component {
    render(){
        // console.log(this.props.navigation.dangerouslyGetState());
        this.props.navigation.addListener('beforeRemove',e => {
            if(this.props.navigation.dangerouslyGetState().index === 1){
                e.preventDefault();
            }
        });
        return (
            // <App>
                <View style={styles.background}>
                    <View style={styles.display}>
                        <ProductList {...this.props}/>
                    </View>
                </View>
            // </App>
        );
    }
}

const styles = StyleSheet.create({
    background : {
        flex: 1,
        backgroundColor : '#eff6fa'
    },
    display : {
        alignItems: 'center'
    }
})

export default Index;