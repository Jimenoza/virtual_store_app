import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native';
import { replace_host, Stars, BottomInputRate} from '../../../common/utils';
import { SingleComment } from '../components/comment';
import Comment from '../components/comment';
import { Colors } from '../../../common/styles';
import {ProductService} from '../../../services/products-service';
import RetryMessage from '../../../common/retry';

class ProductDetail extends Component{
    state = {
        product : null,
        displayComment : false,
        comment : {
            text : '',
            rate : 0,
        }
    }
    service = new ProductService();

    keyExtractor = item => item.id.toString();
    renderItem = ({item}) => {
        return (
            <Comment {...item}/>
        );
    }

    setDisplay(){
        this.setState({
            displayComment : !this.state.displayComment
        });
    }

    handleText(text){
        console.log(text);
        this.setState({
            comment : {
                text : text,
                rate : 0
            }
        });
    }

    loadProduct(){
        const id = this.props.route.params.productId;
        this.service.getProduct(id).then( response => {
            this.setState({
                product : response
            });
        }).catch( err => {
            console.log(err);
        });
    }

    displayDetail(){
        const commentsContainers = this.state.product.comments.map( comment => {
            return <Comment {...comment} key={comment.id}/>
        });
        return (
                <BottomInputRate focus={true} callBackText={(ev) => { this.handleText(ev)}} display={this.state.displayComment}>
                    <ScrollView>
                        <View style={styles.screen_container}>
                            <View style={styles.general_container}>
                                    <View style={styles.image_container}>
                                        <Image
                                            style={styles.image}
                                            source={{
                                                uri: replace_host(this.state.product.product.image)
                                            }}
                                        />
                                    </View>
                                
                                <View style={styles.section_container}>
                                    <Text style={styles.product_category}>{this.state.product.product.category_name}</Text>
                                    <Text style={styles.product_name}>{this.state.product.product.name}</Text>
                                    <Stars rate={this.state.product.product.average}/>
                                    <Text style={styles.product_text}>{this.state.product.product.description}</Text>
                                    <Text style={styles.product_price}>${this.state.product.product.price}</Text>
                                    <TouchableHighlight style={styles.item_add} underlayColor={Colors.darkBlue}>
                                        <Text style={styles.item_add_text}>Agregar a carrito</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.section_container}>
                                    <View style={styles.comments_title_border}>
                                        <Text style={styles.comments_title}>Reseñas</Text>
                                        <TouchableHighlight style={styles.calification} underlayColor={Colors.darkBlue} onPress={() => {this.setDisplay()}}>
                                            <Text style={styles.calification_text}>Dejar una reseña</Text>
                                        </TouchableHighlight>
                                    </View>
                                    {commentsContainers}
                                    {/* <FlatList
                                        keyExtractor={this.keyExtractor}
                                        data={this.state.products}
                                        renderItem={this.renderItem}
                                    /> */}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </BottomInputRate>
            );
    }

    componentDidMount(){
        this.loadProduct();
    }

    render(){
        if(this.state.product){
            return this.displayDetail();
        }
        return <RetryMessage loading={this.state.product === null}></RetryMessage>
    }
}

const styles = StyleSheet.create({
    screen_container : {
        backgroundColor : Colors.backgroundBlue,
        flex: 1,
    },
    general_container : {
        paddingTop: 20,
        paddingRight: 15,
        paddingLeft: 15,
        flexDirection: 'column',
    },
    image_container : {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 450,
        // borderStyle: 'solid',
        // borderWidth: 1,
        borderColor: Colors.lightGray,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        backgroundColor: 'white',

        // elevation: 3,
        marginBottom: 40,
        borderRadius: 10
    },
    image : {
        flex: 1,
        width: 350,
        height: 350,
        resizeMode: 'contain',
        
    },
    section_container : {
        backgroundColor: 'white',
        justifyContent: 'center',
        // marginTop: 40,
        padding: 5,
        borderRadius: 10,
        marginBottom: 40,
    },
    product_category : {
        fontSize: 17,
        color : 'rgba(0,0,0,0.5)'
    },
    product_name : {
        fontSize : 30,
        fontWeight: '500',
        marginTop: 11,
    },
    product_text : {
        marginTop: 7,
        fontSize: 18,
        fontFamily: 'Rubik',
        fontWeight: '400',
        color: Colors.darkGray
    },
    product_price : {
        fontSize: 24,
        fontWeight: '500',
        marginTop: 40,
    },
    item_add : {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Colors.bluePrimary,
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_add_text : {
        fontSize: 15,
        color: 'white'
    },
    comments_title_border : {
        paddingBottom: 10,
        borderBottomWidth: 1,
        // borderStyle: 'solid',
        borderBottomColor: Colors.lightGray,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    comments_title : {
        fontFamily : 'Rubik',
        fontWeight: '500',
        fontSize : 24,
        alignSelf: 'center'
    },
    calification : {
        backgroundColor: Colors.bluePrimary,
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    calification_text : {
        fontSize: 15,
        color: 'white'
    },
    input_pos : {
        position : 'absolute',
        top : 0,
        left: 0,
    }

})

export default ProductDetail;