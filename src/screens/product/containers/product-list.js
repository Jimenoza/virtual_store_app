import React, {Component} from 'react';
import { FlatList } from 'react-native';
import Product from '../components/product'

class ProductList extends Component{
    goToDetails = (item) => {
        this.props.navigation.push('Details',{productId : item.id});
    }
    keyExtractor = item => item.id.toString();
    renderItem = ({item}) => {
        return (
            <Product {...item} onPress={() => {this.goToDetails(item)}}/>
        );
    }
    render(){
        if(this.props.items){
            return <FlatList
                keyExtractor={this.keyExtractor}
                data={this.props.items}
                renderItem={this.renderItem}
                ListFooterComponent={this.props.footer}
                ListEmptyComponent={this.props.loader}
            />
        }
        else{
            return null;
        }
    }
}

export default ProductList;