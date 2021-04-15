import React, {Component} from 'react';
import { FlatList } from 'react-native';
import Product from '../components/product'
import { CartService } from '../../../services/cart-service';

class ProductList extends Component{
    cartService = CartService.getService();
    // cartService = new CartService();
    state = {
        refresh : false,
    }

    addToCart = (item) => {
        item['loading'] = true;
        this.cartService.addItem(item.id).then( response => {
            console.log('response is',response);
        }).catch( err => {
            // console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'});
        }).finally( () => {
            item['loading'] = false;
            this.setState({
                refresh : !this.state.refresh
            });
        });
    }
    goToDetails = (item) => {
        this.props.navigation.push('Details',{productId : item.id});
    }
    keyExtractor = item => item.id.toString();
    renderItem = ({item}) => {
        return (
            <Product {...item} onPress={() => {this.goToDetails(item)}} onPressAdd={() => { this.addToCart(item)}}/>
        );
    }
    render(){
        return <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.items}
            renderItem={this.renderItem}
            ListFooterComponent={this.props.footer}
            ListEmptyComponent={this.props.loader}
            extraData={this.state.refresh}
        />
    }
}

export default ProductList;