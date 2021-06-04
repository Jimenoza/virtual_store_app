import React, {Component, ReactElement} from 'react';
import { FlatList, View, StyleSheet,Text, GestureResponderEvent } from 'react-native';
import ProductComponet from '../components/product'
import { CartService } from '../../../services/cart-service';
import { Product, Props } from '../../../interfaces';
import { Icon } from 'react-native-elements';
import { Card, Colors } from '../../../common'
import Button from '../../../common/generalButton';

interface ProductListPaginatedProps extends Props {
    items: Product[],
    loader?: ReactElement,
    config : {
        current_page: number,
        last_page: number,
        onGoPrevious : (event: GestureResponderEvent) => void,
        onGoNext : (event: GestureResponderEvent) => void,
    }
}

class ProductListPaginated extends Component<ProductListPaginatedProps>{
    cartService = CartService.getService() as CartService;
    // cartService = new CartService();

    addToCart = (item : Product) => { // item is a Product but it is needed to add loading
        item.loading = true;
        this.cartService.addItem(item.id).then( response => {
            console.log('response is',response);
        }).catch( err => {
            // console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'});
        }).finally( () => {
            item.loading = false;
            // this.setState({
            //     refresh : !this.state.refresh
            // });
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

    goToPreviousPage(e : GestureResponderEvent){
        // this.props.config.current_page -= 1;
        this.props.config.onGoPrevious(e);
    }

    goToNextPage(e : GestureResponderEvent){
        // this.props.config.current_page += 1;
        this.props.config.onGoNext(e);
    }

    footer(){
        return(
            <View style={{width : 380}}>
                <Card style={{marginTop : 20,marginBottom: 10}}>
                    <Text>Resutados página {this.props.config.current_page.toString()} de {this.props.config.last_page.toString()}</Text>
                </Card>
                <View style={styles.buttonsContainer}>
                    <Button onPress={(e) => {this.goToPreviousPage(e)}} disabled={this.props.config.current_page <= 1} style={styles.marginRight}>
                        <View style={styles.buttonContent}>
                            <Icon name="navigate-before" size={30} color={this.props.config.current_page <= 1 ? Colors.disabled : Colors.bluePrimary}></Icon>
                            <Text style={[styles.buttonText, {color : this.props.config.current_page <= 1 ? Colors.disabled : Colors.bluePrimary}]}>Anterior</Text>
                        </View>
                    </Button>
                    <Button onPress={(e) => {this.goToNextPage(e)}} disabled={this.props.config.current_page >= this.props.config.last_page} style={styles.marginLeft}>
                        <View style={styles.buttonContent}>
                            <Text style={[styles.buttonText, {color : this.props.config.current_page >= this.props.config.last_page ? Colors.disabled : Colors.bluePrimary}]}>Siguiente</Text>
                            <Icon name="navigate-next" size={30} color={this.props.config.current_page >= this.props.config.last_page ? Colors.disabled : Colors.bluePrimary}></Icon>
                        </View>
                    </Button>
                </View>
            </View>
        )
    }
    render(){
        return <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.items}
            renderItem={this.renderItem}
            ListFooterComponentStyle={{flex:1, justifyContent: 'flex-end'}}
            ListFooterComponent={this.footer()}
            ListEmptyComponent={this.props.loader}
            // extraData={this.state.refresh}
        />
    }
}

const styles = StyleSheet.create({
    buttonsContainer : {
        flexDirection: 'row',
        alignSelf: 'stretch',
        height: 50,
    },
    buttonText : {
        fontSize : 20
    },
    buttonContent : {
        flex : 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    marginLeft : {
        marginLeft : 5
    },
    marginRight : {
        marginRight : 5
    }
})


export default ProductListPaginated;