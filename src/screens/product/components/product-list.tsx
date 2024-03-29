import React, {Component, ReactElement} from 'react';
import { FlatList } from 'react-native';
import ProductComponet from './product'
import { CartService } from '../../../services/cart-service';
import { Product, Props } from '../../../interfaces';

interface ProductListProps extends Props {
    items: Product[],
    footer?: ReactElement,
    loader?: ReactElement,
}

class ProductList extends Component<ProductListProps>{
    cartService = CartService.getService() as CartService;
    // cartService = new CartService();
    state = {
        refresh : false,
    }

    addToCart = (item : Product) => { // item is a Product but it is needed to add loading
        item.loading = true;
        this.cartService.addItem(item.id).then( () => {}).catch( err => {
            // console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'});
        }).finally( () => {
            item.loading = false;
            this.setState({
                refresh : !this.state.refresh
            });
        });
    }
    goToDetails(item: Product){
        this.props.navigation.navigate('Details',{productId : item.id});
    }
    keyExtractor = (item: Product) => item.id.toString();
    renderItem = ({item} : any) => {
        return (
            <ProductComponet prod={item} onPress={() => {this.goToDetails(item)}} onPressAdd={() => { this.addToCart(item)}}/>
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
            style={{paddingLeft : 20, paddingRight: 20}}
        />
    }
}

export default ProductList;