import React, {Component, ReactElement} from 'react';
import { FlatList } from 'react-native';
import ProductComponet from '../components/product'
import { CartService } from '../../../services/cart-service';
import { Product } from '../../../services/product-interfaces';

interface Props {
    navigation: any,
    items: Product[],
    footer: ReactElement,
    loader: ReactElement,
}

class ProductList extends Component<Props>{
    cartService = CartService.getService() as CartService;
    // cartService = new CartService();
    state = {
        refresh : false,
    }

    addToCart = (item : Product) => { // item is a Product but it is needed to add loading
        item.loading = true;
        this.cartService.addItem(item.id).then( response => {
            console.log('response is',response);
        }).catch( err => {
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
        this.props.navigation.push('Details',{productId : item.id});
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
        />
    }
}

export default ProductList;