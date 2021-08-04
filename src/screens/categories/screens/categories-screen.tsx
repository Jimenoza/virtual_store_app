import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../../common/styles';
import { Icon } from 'react-native-elements';
import ProductListPaginated from '../../product/containers/product-list-paginated';
import { Category as CatInterface, CategoryResponse, Product, Props } from '../../../interfaces';
import { CategoryService } from '../../../services/category-service';
import { ProductService } from '../../../services/products-service';
import { productsCategoryStore } from '../../../redux';
import RetryMessage from '../../../common/retry';

interface CategoryClassState {
    icon : string,
    // categories: CatInterface[],
    // products : Product[],
    displayCat: boolean,
    categorySelected?: CatInterface,
    loading: boolean,
}

class Category extends Component<Props>{
    categoryService: CategoryService = new CategoryService();
    productService: ProductService = new ProductService(productsCategoryStore);

    state: CategoryClassState = {
        icon : 'keyboard-arrow-down',
        displayCat : false,
        loading : true,
    }

    categoriesOptions: any[] = [];

    componentDidMount(){
        this.categoryService.getCategories().then( () => {
            this.setState({
                categorySelected : this.categoryService.getState()![0]
            });
            this.categoryService.getState()!.forEach(element => {
                this.categoriesOptions.push(
                    <TouchableHighlight onPress={() => {this.selectCategory(element)}} underlayColor={Colors.lightGray} key={element.id}>
                        <View style={[styles.categoryListItem,styles.underline]}>
                            <Text style={styles.categoryName}>{element.name}</Text>
                        </View>
                    </TouchableHighlight>
                )
            });
            this.productService.getProductsByCategory(this.state.categorySelected!.id).then( response => {
                // this.categoryService.setProductsState(response);
                this.setState({
                    loading : false
                })
            });
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
            loading : true,
            categorySelected: category,
        })
        this.productService.getProductsByCategory(category.id).then( () => {
            this.setState({
                displayCat : false,
                icon : 'keyboard-arrow-down',
                loading : false
            });
        })
    }

    renderPanel(){
        if(this.state.displayCat){
            return this.categoriesOptions
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

    /**
     * Goes to next page if there are pages
     * Also sets previous button enabled or disabled
     */
     goToNextPage(){
        this.productService.getNextPage().then( () => {}).catch( err => {
            console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'})
        });
    }

    /**
     * Goes to previous page if there are pages
     * Also sets next button enabled or disabled
     */
    goToPreviousPage(){
        this.productService.getPreviousPage().then( () => {}).catch( err => {
            console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'});
        });
    }

    getConfig(){
        return {
            current_page: this.productService.getCurrentPage(),
            last_page: this.productService.getLastPage(),
            onGoPrevious : () => {this.goToPreviousPage()},
            onGoNext : () => {this.goToNextPage()},
        }
    }

    render(){
        if(this.state.loading){
            return (<RetryMessage loading={true}></RetryMessage>);
        }
        return (
            <TouchableWithoutFeedback style={styles.absoluteBackroud} onPress={() => {this.hidePanel()}}>
                <View style={styles.background}>
                    <TouchableHighlight style={styles.categoryTitleContainer} underlayColor={Colors.underlayLightBlue} onPress={() => {this.changeIcon()}}>
                        <View style={styles.categoryTitleItems}>
                            <Icon name={this.state.icon} size={25} color={'white'}></Icon>
                            <Text style={styles.categoryTitle}>{this.state.categorySelected!.name}</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.categoryList}>
                        {this.renderPanel()}
                    </View>
                    <View style={styles.display}>
                        <View style={{height : '100%', alignSelf : 'stretch'}}>
                            <ProductListPaginated {...this.props} 
                                items={this.productService.getProductsState()}
                                config={this.getConfig()}
                            />
                        </View>
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
        backgroundColor : 'white',
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
        flex : 1,
        marginBottom : 10
    },
    underline : {
        borderBottomColor: '#f2f2f2',
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