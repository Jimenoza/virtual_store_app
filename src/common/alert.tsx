import { View, StyleSheet, Button, Alert, AlertButton } from "react-native";

interface Props {
    title: string,
    message: string,
    options? : AlertButton[]
    config? : {
        cancelable : boolean,
        onDismiss : () => void,
    }
}

export function alert(props: Props) {
    return Alert.alert(
        props.title,
        props.message,
        props.options,
        props.config
    );
}