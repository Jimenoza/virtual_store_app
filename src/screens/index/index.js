import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableHighlight} from 'react-native';
// import App from '../app';
import Product from '../product/components/product';
import ProductList from '../product/containers/product-list'
import { Colors } from '../../common/styles';
import { ProductService } from '../../services/products-service';
import { Icon } from 'react-native-elements';
import { Card } from '../../common/utils'
import RetryMessage from '../../common/retry';

const FIRST_PAGE = 1;

class Index extends Component {
    service = ProductService.getService();
    state = {
        products : [],
        previous : { // state of previous button
            disabled : true,
            styles : [styles.navButton,styles.marginRight, styles.disabled],
            color : Colors.disabled
        },
        next : {// state of next button
            disabled : false,
            styles : [styles.navButton, styles.marginLeft, styles.enabled],
            color : Colors.bluePrimary,
        },
        loading : false,
    }

    constructor(){
        super();
        if(this.service.getCurrentProducts().length <= 0){ // no objects in cache
            this.service.getListProducts(10).then( response => { //gets products
                // console.log(response);
                this.setState({
                    products : response
                });
            }).catch( err => {
                this.props.navigation.navigate('Modal',{message : 'error'});
                this.setState({
                    loading : false
                })
            });
        }
    }

    updateState(response){
        this.setState({
            next : {
                disabled : !this.service.canGotoNext(),
                styles : [styles.navButton, styles.marginLeft, this.service.canGotoNext()? styles.enabled : styles.disabled],
                color : this.service.canGotoNext()? Colors.bluePrimary : Colors.disabled,
            },
            previous : {
                disabled : !this.service.canGoToBack(),
                styles : [styles.navButton, styles.marginLeft, this.service.canGoToBack()? styles.enabled : styles.disabled],
                color : this.service.canGoToBack()? Colors.bluePrimary : Colors.disabled,
            },
            products : response,
        })
    }

    /**
     * Goes to next page if there are pages
     * Also sets previous button enabled or disabled
     */
    goToNextPage(){
        this.setState({
            products : [],
        });
        this.service.getNextPage().then( response => {
            this.updateState(response);
        }).catch( err => {
            console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'})
        });
    }

    /**
     * Goes to previous page if there are pages
     * Also sets next button enabled or disabled
     */
    goToPreviousPage(){
        this.setState({
            products : [],
        });
        this.service.getPreviousPage().then( response => {
            this.updateState(response);
        }).catch( err => {
            console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'});
        });
    }

    /**
     * Method that returns pagination buttons for results pagination
     * @returns render
     */
    footer(){
        return(
            <View style={{width : 380}}>
                <Card style={{marginTop : 20,marginBottom: 10}}>
                    <Text>Resutados página 1 de 4</Text>
                </Card>
                <View style={styles.buttonsContainer}>
                    <TouchableHighlight style={this.state.previous.styles} underlayColor={Colors.underlayLightBlue} onPress={() => {this.goToPreviousPage()}} disabled={this.state.previous.disabled}>
                        <View style={styles.buttonContent}>
                            <Icon name="navigate-before" size={30} color={this.state.previous.color}></Icon>
                            <Text style={[styles.buttonText, {color : this.state.previous.color}]}>Anterior</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={this.state.next.styles} underlayColor={Colors.underlayLightBlue} onPress={() => {this.goToNextPage()}} disabled={this.state.next.disabled}>
                        <View style={styles.buttonContent}>
                            <Text style={[styles.buttonText, {color : this.state.next.color}]}>Siguiente</Text>
                            <Icon name="navigate-next" size={30} color={this.state.next.color}></Icon>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
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

    /**
     * Checks the state and returns the component to display item or retry message
     */
    displayScreen(){
        // this.props.navigation.navigate('Modal');
        return (
            <View style={styles.display}>
                <View style={{marginBottom: 20}}>
                    <ProductList {...this.props} items={this.state.products} footer={this.footer()} loader={this.loader()}/>
                </View>
            </View>
        )

    }

    retry(){
        this.setState({
            loading : true,
        })
        this.service.getListProducts(10).then( response => {
            this.setState({
                products : response,
            });
        }).catch( err => {
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