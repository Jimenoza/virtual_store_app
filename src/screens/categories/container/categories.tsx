import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../../common/styles';
import { Icon } from 'react-native-elements';
import ProductList from '../../product/containers/product-list';
import { Category as CatInterface, CategoryResponse, Product, Props } from '../../../interfaces';


interface CategoryClassState {
    icon : string,
    categories: CatInterface[],
    products : Product[],
    displayCat: boolean,
    categorySelected: CatInterface
}

class Category extends Component<Props>{
    state: CategoryClassState = {
        icon : 'keyboard-arrow-down',
        categories : categories.data,
        products : categoryProducts.data,
        displayCat : false,
        categorySelected: categories.data[0], 
    }

    categoriesOptions: any[] = [];

    constructor(props: any){
        super(props);
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

    selectCategory(category: CatInterface){
        this.setState({
            categorySelected: category,
            displayCat : false,
            icon : 'keyboard-arrow-down',
        });
    }

    renderPanel(){
        if(this.state.displayCat){
            return this.categoriesOptions
        }
    }

    renderProducts(){
        if(this.state.products){
            return <ProductList {...this.props} items={this.state.products}/>
        }
    }

    hidePanel(){
        if(this.state.displayCat){
            this.setState({
                displayCat : false,
                icon : 'keyboard-arrow-down',
            });
        }
    }

    render(){
        return (
            <TouchableWithoutFeedback style={styles.absoluteBackroud} onPress={() => {this.hidePanel()}}>
                <View style={styles.background}>
                    <TouchableHighlight style={styles.categoryTitleContainer} underlayColor={Colors.underlayLightBlue} onPress={() => {this.changeIcon()}}>
                        <View style={styles.categoryTitleItems}>
                            <Icon name={this.state.icon} size={25} color={'white'}></Icon>
                            <Text style={styles.categoryTitle}>{this.state.categorySelected.name}</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.categoryList}>
                        {this.renderPanel()}
                    </View>
                    <View style={styles.display}>
                        {this.renderProducts()}
                    </View>
                </View>    
            </TouchableWithoutFeedback>
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
        // paddingLeft: 7,
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
    },
    absoluteBackroud : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'red',
    }
})

export default Category;

const categories: CategoryResponse = {
    "data": [
        {
            "id": 1,
            "name": "Escolar",
            "description": "Productos para la escuela, colegio y univesidad",
            "enable": true
        },
        {
            "id": 2,
            "name": "Videojuegos",
            "description": "Diferentes videojuegos para consolas",
            "enable": true
        },
        {
            "id": 3,
            "name": "Consolas",
            "description": "Diversión para toda la familia",
            "enable": true
        },
        {
            "id": 4,
            "name": "Accesorios",
            "description": "Accesorios para la vida diaria",
            "enable": true
        },
        {
            "id": 5,
            "name": "Fáciles",
            "description": "Personas baratas para pasar el rato",
            "enable": false
        },
        {
            "id": 6,
            "name": "Deporte",
            "description": "Productos para el deporte",
            "enable": true
        },
        {
            "id": 7,
            "name": "prueba",
            "description": "algo de prueba dos años después",
            "enable": false
        },
        {
            "id": 8,
            "name": "Salud",
            "description": "Medicinas y vacunas varias",
            "enable": true
        },
        {
            "id": 9,
            "name": "Celulares",
            "description": "Celulares varios, desde ladrillos hasta smartphones",
            "enable": true
        },
        {
            "id": 10,
            "name": "Electrónica",
            "description": "Electrónica en general",
            "enable": false
        },
        {
            "id": 11,
            "name": "Tattoos",
            "description": "Diferentes diseños de tatuajes",
            "enable": true
        }
    ],
    "error": null
}

const categoryProducts: {data : Product[], error : string | null} = {
    "data": [
        {
            "id": 4,
            "name": "Fallout 4",
            "description": "Un mundo postapocalíptico después de una guerra nuclear",
            "image": "http://localhost:8000/images/productos/1603339114.webp",
            "price": 45,
            "stock": 18,
            "available": true,
            "califications": 0,
            "average": 0,
            "category_id": 2,
            "category_name" : "Videojuegos"
        },
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
    "error": null
}