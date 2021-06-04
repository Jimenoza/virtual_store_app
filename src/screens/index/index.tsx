import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableHighlight} from 'react-native';
// import App from '../app';
import ProductList from '../product/containers/product-list'
import { Colors } from '../../common/styles';
import { ProductService } from '../../services/products-service';
import { Product, Props } from '../../interfaces';
import RetryMessage from '../../common/retry';
import ProductListPaginated from '../product/containers/product-list-paginated';
import { productStore } from '../../redux';

class Index extends Component<Props> {
    service = new ProductService(productStore)// Casting
    state = {
        loading : false,
    }

    constructor(props: Props){
        super(props);
        if(this.service.getCacheProducts().length <= 0){ // no objects in cache
            this.service.getProducts(10).then( response => { //gets products
            }).catch( err => {
                this.props.navigation.navigate('Modal',{message : 'error'});
                this.setState({
                    loading : false
                })
            });
        }
        this.service.subscribe( () => {
            this.setState({
                loading : false,
            });
            // this.updateState();
        });
    }

    /**
     * Goes to next page if there are pages
     * Also sets previous button enabled or disabled
     */
    goToNextPage(){
        this.service.getNextPage().then( response => {}).catch( err => {
            console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'})
        });
    }

    /**
     * Goes to previous page if there are pages
     * Also sets next button enabled or disabled
     */
    goToPreviousPage(){
        this.service.getPreviousPage().then( response => {}).catch( err => {
            console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'});
        });
    }

    loader(){
        return (
            <View style={styles.centerLoader}>
                <ActivityIndicator size='large' color={Colors.bluePrimary} animating={true}/>
                {/* <Button onPress={() => {
                    this.props.navigation.navigate('Modal',{message : 'error'});}} title="Modal"></Button> */}
            </View>
        );
    }

    getConfig(){
        return {
            current_page: this.service.getCurrentPage(),
            last_page: this.service.getLastPage(),
            onGoPrevious : () => {this.goToPreviousPage()},
            onGoNext : () => {this.goToNextPage()},
        }
    }

    /**
     * Checks the state and returns the component to display item or retry message
     */
    displayScreen(){
        // this.props.navigation.navigate('Modal');
        return (
            <View style={styles.display}>
                <View style={{marginBottom: 20}}>
                    <ProductListPaginated {...this.props} config={this.getConfig()} items={this.service.getCacheProducts()} loader={this.loader()}></ProductListPaginated>
                </View>
            </View>
        )

    }

    retry(){
        this.setState({
            loading : true,
        })
        this.service.getProducts(10).then( response => {}).catch( err => {
            this.props.navigation.navigate('Modal',{message : 'error'});
        }).finally( () => {
            this.setState({
                loading : false,
            })
        });
    }

    render(){
        if(!this.service.isApiOk()){
            return (
                <RetryMessage action={ () => { this.retry() }} loading={this.state.loading}></RetryMessage>
            )
        }
        return (
            <View style={styles.background}>
                {this.displayScreen()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background : {
        flex: 1,
        backgroundColor : Colors.backgroundBlue
    },
    display : {
        alignItems: 'center'
    },
    centerLoader : {
        marginTop: 20,
        justifyContent: 'center',
        flex: 1,
    },
    buttonsContainer : {
        flexDirection: 'row',
        alignSelf: 'stretch',
        height: 50,
    },
    navButton : {
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 1,
        alignItems : 'center'
    },
    buttonText : {
        fontSize : 20
    },
    buttonContent : {
        flex : 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    disabled : {
        backgroundColor : Colors.lightGray,
        borderColor: Colors.lightGray,
        color : Colors.disabled,
    },
    enabled : {
        borderColor: Colors.bluePrimary,
        color : Colors.bluePrimary,
        backgroundColor: 'white'
    },
    marginLeft : {
        marginLeft : 5
    },
    marginRight : {
        marginRight : 5
    }
})

export default Index;