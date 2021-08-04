import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TextInputSubmitEditingEventData } from 'react-native';
import ProductListPaginated from '../../product/containers/product-list-paginated';
import { Colors } from '../../../common/styles';
import { ProductOverviewResponse, Props, Product } from '../../../interfaces';
import { ProductService } from '../../../services';
import { productSearchStore } from '../../../redux';
import { Icon } from 'react-native-elements';
import ScreenMessage from '../../../common/screenMessage';

class SearchScreen extends Component<Props>{
    service = new ProductService(productSearchStore);

    state: { searching : boolean, hasSearched : boolean} = {
        searching: false,
        hasSearched : false,
    };
    
    search(event: TextInputSubmitEditingEventData){
        if(event.text){
            this.setState({
                searching : true,
                hasSearched: true,
            });
            this.service.searchProducts(event.text).then( () => {
                this.setState({
                    searching : false,
                });
            });
        }
    }
    /**
     * Goes to next page if there are pages
     * Also sets previous button enabled or disabled
     */
     goToNextPage(){
        this.service.getNextPage().then( () => {}).catch( err => {
            console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'})
        });
    }

    /**
     * Goes to previous page if there are pages
     * Also sets next button enabled or disabled
     */
    goToPreviousPage(){
        this.service.getPreviousPage().then( () => {}).catch( err => {
            console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'});
        });
    }

    getConfig(){
        return {
            current_page: this.service.getCurrentPage(),
            last_page: this.service.getLastPage(),
            onGoPrevious : () => {this.goToPreviousPage()},
            onGoNext : () => {this.goToNextPage()},
        }
    }

    displayEmptyList(){
        const message = this.state.hasSearched? 'Ooops, no encontramos nada con tu búsqueda' : 'Primero realiza una búsqueda';
        const icon = this.state.hasSearched? 'cancel' : 'search';
        return(
            // <Text>No hay productos</Text>
            <ScreenMessage message={message} iconName={icon}/>
        )
    }

    renderResults(){
        if(this.state.searching){
            return (<ActivityIndicator size='large' color={Colors.bluePrimary} animating={true}/>);
        }
        return (
            <View style={{height : '100%', alignSelf : 'stretch'}}>
                <ProductListPaginated {...this.props} 
                    items={this.service.getProductsState()} 
                    config={this.getConfig()}
                    loader={this.displayEmptyList()}
                />
            </View>
        )
    }

    render(){
        return (
            <View style={styles.screen_container}>
                <View style={styles.search_container}>
                    <TextInput autoFocus={true} style={styles.box} placeholder='Buscar...' onSubmitEditing={(ev) => this.search(ev.nativeEvent)}/>
                </View>
                <View style={styles.display}>
                    {this.renderResults()}
                </View>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    screen_container : {
        backgroundColor : Colors.backgroundBlue,
        flex: 1,
    },
    box : {
        backgroundColor: 'white',
        height: 30,
        padding: 0,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        paddingLeft: 10,
    },
    search_container: {
        backgroundColor: Colors.lightGray,
        alignSelf: 'stretch',
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    display : {
        alignItems: 'center',
        flex : 1,
        marginBottom : 10,
    },
    messageContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
});

export default SearchScreen;