import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
// import App from '../app';
import Product from '../product/components/product';
import ProductList from '../product/containers/product-list'
import { Colors } from '../../common/styles';

const products = {
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "name": "Bulto Jansport",
                "description": "Bulto azul con fondo café",
                "image": "http://localhost:8000/images/productos/1602557763.jpg",
                "price": 15,
                "stock": 18,
                "available": 1,
                "califications": 1,
                "average": 5,
                "category_id": 1,
                "category_name": "Escolar"
            },
            {
                "id": 2,
                "name": "Billetera",
                "description": "Billetera para hombre",
                "image": "http://localhost:8000/images/productos/1601436540.jpg",
                "price": 10,
                "stock": 31,
                "available": 1,
                "califications": 0,
                "average": 0,
                "category_id": 4,
                "category_name": "Accesorios"
            },
            {
                "id": 3,
                "name": "Nintendo Switch",
                "description": "La última consola de nintendo",
                "image": "http://localhost:8000/images/productos/1601442531.jpg",
                "price": 299,
                "stock": 0,
                "available": 1,
                "califications": 0,
                "average": 0,
                "category_id": 3,
                "category_name": "Consolas"
            },
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
                "category_id": 2,
                "category_name": "Videojuegos"
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
                "category_id": 2,
                "category_name": "Videojuegos"
            },
            {
                "id": 7,
                "name": "Lentes",
                "description": "anteojos unisex",
                "image": "http://localhost:8000/images/productos/1601437471.jpg",
                "price": 15,
                "stock": 3,
                "available": 1,
                "califications": 0,
                "average": 0,
                "category_id": 4,
                "category_name": "Accesorios"
            },
            {
                "id": 10,
                "name": "Wii U",
                "description": "Una consola que parecía un control para la wii",
                "image": "http://localhost:8000/images/productos/1602301594.png",
                "price": 110,
                "stock": 5,
                "available": 1,
                "califications": 0,
                "average": 0,
                "category_id": 3,
                "category_name": "Consolas"
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
                "category_id": 2,
                "category_name": "Videojuegos"
            },
            {
                "id": 12,
                "name": "Cuadernos",
                "description": "Cuardenos multicolor para escuela, colegio, universidad",
                "image": "http://localhost:8000/images/productos/1601437562.jpg",
                "price": 12,
                "stock": 49,
                "available": 1,
                "califications": 1,
                "average": 5,
                "category_id": 1,
                "category_name": "Escolar"
            },
            {
                "id": 13,
                "name": "Audífonos",
                "description": "Audífonos negros grandes",
                "image": "http://localhost:8000/images/productos/1601437588.jpg",
                "price": 14.99,
                "stock": 7,
                "available": 1,
                "califications": 2,
                "average": 2,
                "category_id": 4,
                "category_name": "Accesorios"
            }
        ],
        "first_page_url": "http://localhost:8000/api/products?page=1",
        "from": 1,
        "last_page": 2,
        "last_page_url": "http://localhost:8000/api/products?page=2",
        "links": [
            {
                "url": null,
                "label": "&laquo; Anterior",
                "active": false
            },
            {
                "url": "http://localhost:8000/api/products?page=1",
                "label": 1,
                "active": true
            },
            {
                "url": "http://localhost:8000/api/products?page=2",
                "label": 2,
                "active": false
            },
            {
                "url": "http://localhost:8000/api/products?page=2",
                "label": "Siguiente &raquo;",
                "active": false
            }
        ],
        "next_page_url": "http://localhost:8000/api/products?page=2",
        "path": "http://localhost:8000/api/products",
        "per_page": 10,
        "prev_page_url": null,
        "to": 10,
        "total": 17
    },
    "error": null
}

class Index extends Component {
    render(){
        // console.log(this.props.navigation.dangerouslyGetState());
        // this.props.navigation.addListener('beforeRemove',e => {
        //     if(this.props.navigation.dangerouslyGetState().index === 1){
        //         e.preventDefault();
        //     }
        // });
        return (
            // <App>
                <View style={styles.background}>
                    <View style={styles.display}>
                        <ProductList {...this.props} items={products.data.data}/>
                    </View>
                </View>
            // </App>
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
    }
})

export default Index;