import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TextInputSubmitEditingEventData } from 'react-native';
import ProductListPaginated from '../../product/containers/product-list-paginated';
import { Colors } from '../../../common/styles';
import { ProductOverviewResponse, Props, Product } from '../../../interfaces';
import { ProductService } from '../../../services';
import { productSearchStore } from '../../../redux';

const results: ProductOverviewResponse = {
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 5,
                "name": "The last of us",
                "description": "Juego del año 2013",
                "image": "http://localhost:8000/images/productos/1601437419.jpg",
                "price": 19.99,
                "stock": 18,
                "available": true,
                "califications": 0,
                "average": 0,
                "category_id": 2,
                "category_name" : "Videojuegos"
            },
            {
                "id": 11,
                "name": "Zelda Breath of the Wild",
                "description": "Último juego de la Saga The Legende of Zelda. Mejor juego del año 2017",
                "image": "http://localhost:8000/images/productos/1601437528.jpg",
                "price": 59.99,
                "stock": 27,
                "available": true,
                "califications": 1,
                "average": 5,
                "category_id": 2,
                "category_name" : "Videojuegos"
            },
            {
                "id": 19,
                "name": "The Last of Us Part II",
                "description": "Secuela del primer juego",
                "image": "http://localhost:8000/images/productos/1601437723.jpg",
                "price": 59.99,
                "stock": 8,
                "available": true,
                "califications": 1,
                "average": 4,
                "category_id": 2,
                "category_name" : "Videojuegos"
            }
        ],
        "first_page_url": "http://localhost:8000/api/products/search?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://localhost:8000/api/products/search?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Anterior",
                "active": false
            },
            {
                "url": "http://localhost:8000/api/products/search?page=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Siguiente &raquo;",
                "active": false
            }
        ],
        "path": "http://localhost:8000/api/products/search",
        "per_page": 10,
        "to": 3,
        "total": 3
    },
    "error": null
}

class SearchScreen extends Component<Props>{
    service = new ProductService(productSearchStore);

    state: { searching : boolean} = {
        searching: false,
    };
    
    search(event: TextInputSubmitEditingEventData){
        this.setState({
            searching : true,
        });
        this.service.searchProducts(event.text).then( () => {
            this.setState({
                searching : false,
            });
        });
        // if(event){
        //     this.setState( {
        //         searching : true,
        //         products: results,
        //     });
        // }
        // if(!event){
        //     this.setState( {
        //         searching : false,
        //         products: null,
        //     });
        // }
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

    renderResults(){
        if(this.state.searching){
            return (<ActivityIndicator size='large' color={Colors.bluePrimary} animating={true}/>);
        }
        return (
            <ProductListPaginated {...this.props} 
                items={this.service.getCacheProducts()} 
                config={this.getConfig()}
                loader={<Text>No hay productos</Text>}
            />
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
        backgroundColor: 'red',
        flex : 1
    }
});

export default SearchScreen;