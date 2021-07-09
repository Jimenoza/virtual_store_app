import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { replace_host, Stars, BottomInputRate} from '../../../common';
import { SingleComment } from '../components/comment';
import Comment from '../components/comment';
import { Colors } from '../../../common/styles';
import { ProductService, CartService, UserService} from '../../../services';
import { ProductDetail as  ProductDetailType, Comment as CommentType, Product as  ProductType, Props} from '../../../interfaces';
import RetryMessage from '../../../common/retry';
import LoadingButton from '../../../common/loadingButton';

interface State {
    product : ProductType,
    comments : CommentType[]
    displayComment : boolean,
    allowComment : boolean,
    loading : boolean,
    comment : {
        text : string,
        rate : number
    }
}

class ProductDetail extends Component<Props>{
    cartService = new CartService();
    service = new ProductService();
    userService = new UserService();
    scrollView: ScrollView | null = null;
    state : State = {
        product : null!,
        comments : [],
        loading : false,
        displayComment : false, // display the input and keyboard
        allowComment : true, // allowComment means for letting the user comment the product (enabling type and rate on inputs)
        comment : {
            text : '',
            rate : 0,
        }
    }

    handleRate(value : number){
        this.setState({
            comment : {
                rate : value,
                text : this.state.comment.text
            }
        })
    }

    keyExtractor = (item : any) => item.id.toString();
    renderItem = ({item} : any) => {
        return (
            <Comment {...item}/>
        );
    }

    setDisplay(){
        this.setState({
            displayComment : !this.state.displayComment
        });
    }

    addToCart(item : number){ // item is a Product but it is needed to add loading
        this.cartService.addItem(item).catch( err => {
            // console.log(err);
            this.props.navigation.navigate('Modal',{message : 'error'});
        });
    }

    handleText(text : string){
        this.setState({
            comment : {
                text : text,
                rate : this.state.comment.rate
            }
        });
    }

    submitRate(){
        this.setState({
            loading : true,
            allowComment : false,
        });
        this.service.rateProduct(this.state.product.id,this.state.comment.text,this.state.comment.rate).then( response => {
            this.setState({
                loading : false,
                comments : this.state.comments.concat(response),
                allowComment : true,
                comment : {
                    text : '',
                    rate : 0,
                }
            })
        });
        this.goToScreenEnd();
    }

    loadProduct(){
        const id = this.props.route.params.productId;
        this.service.getProduct(id).then( (response: ProductDetailType) => {
            this.setState({
                product : response.product,
                comments : response.comments,
            });
        }).catch( err => {
            console.log(err);
        });
    }

    /**
     * Displays a new rate at the botom of comments
     */
    displayNewComment(){
        if(this.state.displayComment && this.userService.getUser() !== null){
            return <SingleComment text={this.state.comment.text} stars={this.state.comment.rate} name={this.userService.getUser()!.name}/>
        }
    }

    goToScreenEnd(){
        if(this.state.displayComment && this.userService.getUser() !== null){
            this.scrollView!.scrollToEnd({animated: true});
        }
    }

    displayAllComments(){
        return this.state.comments.map( (comment : CommentType) => {
            return <Comment body={comment} key={comment.id}/>
        });
    }

    loadComments(){
        if(this.state.loading){
            return (
                <View style={styles.loader}>
                    <ActivityIndicator animating={true} color={'white'} size={'large'}/>
                </View>
            );
        }
    }

    displayDetail(){
        return (
                <BottomInputRate focus={true} 
                    callBackText={(ev : any) => { this.handleText(ev)}} display={this.state.displayComment} enabled={this.state.allowComment}
                    callBackPicker={(value : number) => this.handleRate(value)}
                    callBackEnter={() => { this.submitRate()}}
                    selectedValue={this.state.comment.rate}>
                    <ScrollView ref={ref => {this.scrollView = ref}} onContentSizeChange={() => this.goToScreenEnd()}>
                        <View style={styles.screen_container}>
                            <View style={styles.general_container}>
                                    <View style={styles.image_container}>
                                        <Image
                                            style={styles.image}
                                            source={{
                                                uri: replace_host(this.state.product.image)
                                            }}
                                        />
                                    </View>
                                
                                <View style={styles.section_container}>
                                    <Text style={styles.product_category}>{this.state.product.category_name}</Text>
                                    <Text style={styles.product_name}>{this.state.product.name}</Text>
                                    <Stars rate={this.state.product.average}/>
                                    <Text style={styles.product_text}>{this.state.product.description}</Text>
                                    <Text style={styles.product_price}>${this.state.product.price}</Text>
                                    <LoadingButton 
                                        style={[styles.item_add,styles.item_add_text]} 
                                        onPress={() => {this.addToCart(this.state.product.id)}}
                                        enabledLabel={'Agregar al Carrito'}
                                        disabledLabel={'Agotado'}
                                        disabled={this.state.product.stock === 0}
                                    />
                                </View>
                                <View style={styles.section_container}>
                                    {this.loadComments()}
                                    <View style={styles.comments_title_border}>
                                        <Text style={styles.comments_title}>Reseñas</Text>
                                        <TouchableHighlight style={styles.calification} underlayColor={Colors.darkBlue} onPress={() => {this.setDisplay()}}>
                                            <Text style={styles.calification_text}>Dejar una reseña</Text>
                                        </TouchableHighlight>
                                    </View>
                                    {this.displayAllComments()}
                                    {this.displayNewComment()}
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

    componentDidUpdate(){
        this.scrollView!.scrollToEnd({animated: true});
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
        paddingRight: 5,
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
    loader : {
        backgroundColor : Colors.darkGrayTranslucid,
        position : 'absolute',
        top: 0,
        left: 0,
        zIndex : 1,
        alignSelf : 'stretch',
        width : '103%',
        height : '104%',
        borderRadius : 10,
        flex : 1,
        justifyContent: 'center'
    }

})

export default ProductDetail;