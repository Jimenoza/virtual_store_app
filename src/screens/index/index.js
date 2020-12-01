import React from 'react';
import { View, Text} from 'react-native';
import Header from '../../common/header';
import App from '../app';

function DetailsScreen() {
    return (
        <App>
            <View>
                <View>
                    <Header/>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Details Screen</Text>
                </View>
            </View>
        </App>
    );
}

export default DetailsScreen;