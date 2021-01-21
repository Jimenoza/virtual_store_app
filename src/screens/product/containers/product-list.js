import React, {Component} from 'react';
import { FlatList } from 'react-native';
import Product from '../components/product'

class ProductList extends Component{
    goToDetails = (item) => {
        this.props.navigation.push('Details',{product_id : item.id});
    }
    keyExtractor = item => item.id.toString();
    renderItem = ({item}) => {
        return (
          < Product {...item} onPress={() => {this.goToDetails(item)}}/>
        );
    }
    render(){
        if(this.props.items){
            return <FlatList
                keyExtractor={this.keyExtractor}
                data={this.props.items}
                renderItem={this.renderItem}
            />
        }
        else{
            return null;
        }
    }
}

export default ProductList;