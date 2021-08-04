import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { Colors } from '../../../common/styles';
import ProductList from '../../product/components/product-list';
import { Props, OrderDetailedResponse, Product } from '../../../interfaces';
import { OrderService } from '../../../services';

class OrderDetail extends Component<Props>{
    service = new OrderService();
    state : { loading: boolean, products: Product[]  } = {
        loading : true,
        products: []
    }
    constructor(props: any){
        super(props);
    }

    componentDidMount(){
        const orderId = this.props.route.params.order_id;
        this.service.getOrder(orderId).then( res => {
            this.setState({
                products : res,
                loading : false
            })
        });
    }

    render(){
        if(this.state.loading){
            return(
                <View style={styles.centerLoader}>
                    <ActivityIndicator size='large' color={Colors.bluePrimary} animating={true}/>
                </View>
            )
        }
        return(
            <View style={styles.background}>
                <View style={styles.display}>
                    <View style={{height : '100%', alignSelf : 'stretch'}}>
                        <ProductList {...this.props} items={this.state.products}/>
                    </View>
                </View>
            </View>
        )
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
});

export default OrderDetail;