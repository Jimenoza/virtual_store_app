import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../../common/styles';
import { Icon } from 'react-native-elements';
import ProductList from '../../product/containers/product-list';

class Category extends Component{
    state = {
        icon : 'keyboard-arrow-down',
        categories : categories.data,
        products : categoryProducts,
        displayCat : false,
        categorySelected: categories.data[0], 
    }

    categoriesOptions = [];

    constructor(){
        super();
        this.state.categories.forEach(element => {
            this.categoriesOptions.push(
                <TouchableHighlight onPress={() => {this.selectCategory(element)}} underlayColor={'#9db9c7'} key={element.id}>
                    <View style={[styles.categoryListItem,styles.underline]}>
                        <Text style={styles.categoryName}>{element.name}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
    }

    changeIcon(){
        if(this.state.icon === 'keyboard-arrow-down'){
            this.setState({
                icon : 'keyboard-arrow-up',
                displayCat: true,
            });
        }
        else{
            this.setState({
                icon : 'keyboard-arrow-down',
                displayCat : false,
            });
        }
    }

    selectCategory(category){
        this.setState({
            categorySelected: category,
            displayCat : false,
            icon : 'keyboard-arrow-down',
        });
    }

    renderOptions(){
        if(this.state.displayCat){
            return this.categoriesOptions
        }
    }

    renderProducts(){
        if(this.state.products){
            return <ProductList {...this.props} items={this.state.products.data}/>
        }
    }

    render(){
        return (
            <View style={styles.background}>
                <TouchableHighlight style={styles.categoryTitleContainer} underlayColor={Colors.underlayLightBlue} onPress={() => {this.changeIcon()}}>
                    <View style={styles.categoryTitleItems}>
                        <Icon name={this.state.icon} size={25} color={'white'}></Icon>
                        <Text style={styles.categoryTitle}>{this.state.categorySelected.name}</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.categoryList}>
                    {this.renderOptions()}
                </View>
                <View style={styles.display}>
                    {this.renderProducts()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background : {
        backgroundColor: Colors.backgroundBlue,
        flex: 1,
    },
    categoryTitleContainer : {
        backgroundColor : Colors.bluePrimary,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
    },
    categoryTitleItems : {
        flexDirection: 'row',
        width: '100%',
        flex : 1,
        alignItems: 'center'
    },
    categoryTitle : {
        color: 'white',
        fontSize: 25,
    },
    categoryList : {
        backgroundColor : Colors.lightGray,
        width: '100%',
        position: 'absolute',
        zIndex: 10,
        top: 40,
    },
    categoryListItem : {
        height: 40,
        paddingLeft: 20,
        justifyContent: 'center',
        paddingLeft: 7,
    },
    categoryName : {
        color : Colors.darkGray,
        fontSize: 20,
    },
    display : {
        alignItems: 'center',
    },
    underline : {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10
    }
})

export default Category;

const categories = {
    "data": [
        {
            "id": 1,
            "name": "Escolar",
            "description": "Productos para la escuela, colegio y univesidad",
            "enable": 1
        },
        {
            "id": 2,
            "name": "Videojuegos",
            "description": "Diferentes videojuegos para consolas",
            "enable": 1
        },
        {
            "id": 3,
            "name": "Consolas",
            "description": "Diversión para toda la familia",
            "enable": 1
        },
        {
            "id": 4,
            "name": "Accesorios",
            "description": "Accesorios para la vida diaria",
            "enable": 1
        },
        {
            "id": 5,
            "name": "Fáciles",
            "description": "Personas baratas para pasar el rato",
            "enable": 0
        },
        {
            "id": 6,
            "name": "Deporte",
            "description": "Productos para el deporte",
            "enable": 1
        },
        {
            "id": 7,
            "name": "prueba",
            "description": "algo de prueba dos años después",
            "enable": 0
        },
        {
            "id": 8,
            "name": "Salud",
            "description": "Medicinas y vacunas varias",
            "enable": 1
        },
        {
            "id": 9,
            "name": "Celulares",
            "description": "Celulares varios, desde ladrillos hasta smartphones",
            "enable": 1
        },
        {
            "id": 10,
            "name": "Electrónica",
            "description": "Electrónica en general",
            "enable": 0
        },
        {
            "id": 11,
            "name": "Tattoos",
            "description": "Diferentes diseños de tatuajes",
            "enable": 1
        }
    ],
    "error": null
}

const categoryProducts = {
    "data": [
        {
            "id": 4,
            "name": "Fallout 4",
            "description": "Un mundo postapocalíptico después de una guerra nuclear",
            "image": "http://localhost:8000/images/productos/1603339114.webp",
            "price": 45,
            "stock": 18,
            "available": 1,
            "califications": 0,
            "average": 0,
            "category_id": 2
        },
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