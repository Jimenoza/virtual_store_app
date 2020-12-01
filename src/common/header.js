import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

function Header(props) {
  return (
    <View>
        <View style={styles.header_container}>
            <View style={styles.column_header}>
                <View style={styles.header}>
                    <View style={styles.logo_container}>
                        <TouchableWithoutFeedback>
                            <View>
                                <View style={styles.burger}></View>
                                <View style={styles.burger}></View>
                                <View style={styles.burger}></View>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.logo}>Tienda Virtual</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/images/cart.png')}></Image>
                        <View style={styles.count_container}></View>
                    </View>
                </View>
            </View>
        </View>
        {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
    header_container : {
        height: 72,
        backgroundColor: 'white'
    },
    column_header : {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 15,
    },
    header : {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    logo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0e8ce4',
    },
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    burger: {
        width: 35,
        height: 3,
        backgroundColor: 'black',
        margin: 6,
    },
    count_container: {
        width: 21,
        height: 21,
        backgroundColor: '#0e8ce4'
    }
})

export default Header;
