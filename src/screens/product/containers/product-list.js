import React, {Component} from 'react';
import { FlatList } from 'react-native';
import Product from '../components/product'

class ProductList extends Component{
    print = (item) => {
        console.log(item.id);
    }
    keyExtractor = item => item.id.toString();
    renderItem = ({item}) => {
        return (
          < Product {...item} onPress={() => {this.print(item)}}/>
        );
    }
    render(){
        return <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.list}
            renderItem={this.renderItem}
        />
    }
}

export default ProductList;