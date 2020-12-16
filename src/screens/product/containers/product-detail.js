import React, { Component } from 'react';
import {Text} from 'react-native';

class ProductDetail extends Component{
    render(){
        return (
            <Text>{this.props.route.params.product_id}</Text>  
        );
    }
}

export default ProductDetail;