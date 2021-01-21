import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import ProductList from '../../product/containers/product-list';

const results = {
    "data": [
        {
            "id": 5,
            "name": "The last of us",
            "description": "Juego del año 2013",
            "image": "http://localhost:8000/images/productos/1601437419.jpg",
            "price": 19.99,
            "stock": 18,
            "available": 1,
            "califications": 0,
            "average": 0,
            "category_id": 2
        },
        {
            "id": 11,
            "name": "Zelda Breath of the Wild",
            "description": "Último juego de la Saga The Legende of Zelda. Mejor juego del año 2017",
            "image": "http://localhost:8000/images/productos/1601437528.jpg",
            "price": 59.99,
            "stock": 27,
            "available": 1,
            "califications": 1,
            "average": 5,
            "category_id": 2
        },
        {
            "id": 19,
            "name": "The Last of Us Part II",
            "description": "Secuela del primer juego",
            "image": "http://localhost:8000/images/productos/1601437723.jpg",
            "price": 59.99,
            "stock": 8,
            "available": 1,
            "califications": 1,
            "average": 4,
            "category_id": 2
        }
    ],
    "error": null
}

class SearchScreen extends Component{
    state = {
        products: null,
        searching: false,
    };
    
    search(event){
        if(event){
            this.setState( {
                searching : true,
                products: results,
            });
        }
        if(!event){
            this.setState( {
                searching : false,
                products: null,
            });
        }
    }

    renderResults(){
        if(this.state.products){
            return <ProductList {...this.props} items={this.state.products.data}/>
        }
    }

    render(){
        return (
            <View style={styles.screen_container}>
                <View style={styles.search_container}>
                    <TextInput autoFocus={true} style={styles.box} placeholder='Buscar...' onChangeText={(ev) => this.search(ev)}/>
                </View>
                <View style={styles.display}>
                    <ActivityIndicator size='large' color="#0e8ce4" animating={this.state.searching}/>
                    {this.renderResults()}
                </View>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    screen_container : {
        backgroundColor : '#eff6fa',
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
        backgroundColor: '#e3e3e3',
        alignSelf: 'stretch',
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    display : {
        alignItems: 'center',
    }
});

export default SearchScreen;