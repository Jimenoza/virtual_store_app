import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
// import App from '../app';
import Product from '../product/components/product';
import ProductList from '../product/containers/product-list'
// import Header from '../../common/header';

function DetailsScreen(props) {
    return (
        // <App>
            <View style={styles.background}>
                <View style={styles.display}>
                    <ProductList {...props}/>
                </View>
            </View>
        // </App>
    );
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

export default DetailsScreen;