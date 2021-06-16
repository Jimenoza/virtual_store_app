import { CommonActions, StackActions } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';

export type NavigationProp = CompositeNavigationProp<DrawerNavigationProp<any>,StackNavigationProp<any>>;

export interface Response {
    data : any,
    error : string | null
}

export interface Props {
    navigation: NavigationProp,
    route: {
        key : string,
        name: string,
        params : any
    }
}