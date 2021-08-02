import React, {useState} from 'react';
import { View, StyleSheet, TextInput,Text,
        KeyboardAvoidingView, Platform,
        TouchableHighlight,
        TouchableWithoutFeedback,
        NativeSyntheticEvent,
        TextInputSubmitEditingEventData
} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler'
import { Colors } from './styles';

interface Props {
    display : boolean, 
    focus : boolean,
    children : JSX.Element,
    callBackText? : ((text: string) => void),
    callBackEnter? : ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    enabled: boolean,
}
interface BottomInputRateProps extends Props{
    callBackPicker? : ((value: number) => void),
    selectedValue : any,
}

/**
 * Gets the behavior for KeyboardAvoidingView according to platform
 * If iOS: padding, android : undefined
 * @returns 'padding' | undefined
 */
function getBehavior(): 'padding' | undefined{
    if( Platform.OS === 'ios' ){
        return 'padding';
    }
}



export function BottomInputRate(props : BottomInputRateProps){
    let textInput: TextInput | null = null;
    const [displayPanel,setDisplayPanel] = useState<boolean>(false);
    const [rateValue,setRateValue] = useState<number>(0);

    const assingValue = (value : number) => {
        setRateValue(value); 
        setDisplayPanel(false);
        if(props.callBackPicker){
            props.callBackPicker(value);
        }
    }

    const disabledStyles : {input : any[],select : any[]} = {input : [styles.input], select : [styles.rateTitle]};
    if(!props.enabled){
        disabledStyles.input.push({backgroundColor : Colors.lightGray, borderBottomRightRadius: 0,borderTopRightRadius : 0});
        disabledStyles.select.push({backgroundColor : Colors.disabled,});
    }

    const optionsPanel = () => {
        if(displayPanel){
            const options: JSX.Element[] = [];
            if(Platform.OS === 'android'){
                for(let i = 0; i < 5; i++){
                    options.push(<TouchableOpacity style={styles.rateOption} onPress={() => assingValue(i + 1)} key={i}>
                                    <Text style={styles.rateValue}>{i + 1}</Text>
                                </TouchableOpacity>)
                }
            }
            else if(Platform.OS === 'ios'){
                for(let i = 0; i < 5; i++){
                    options.push(<TouchableHighlight underlayColor={Colors.backgroundBlue} style={styles.rateOption} onPress={() => assingValue(i + 1)} key={i}>
                                    <Text style={styles.rateValue}>{i + 1}</Text>
                                </TouchableHighlight>)
                }
            }
            return options;
        }
    }

    const displayTitle = () => {
        if(rateValue > 0){
            return rateValue;
        }
        else {
            return 'Calificacion';
        }
    }
    
    const input = <View style={{height : 50}}>
                    <View style={styles.input_container}>
                        <View style={styles.input_sub_container}>
                            <TextInput editable={props.enabled} style={disabledStyles.input} placeholder='Comentario...' 
                                autoFocus={props.focus} onChangeText={props.callBackText}
                                ref={input => { textInput = input }}
                                onSubmitEditing={(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
                                    if(props.callBackEnter){
                                        props.callBackEnter(e);
                                        textInput?.clear();
                                    }
                                }}/>
                            <TouchableHighlight disabled={!props.enabled} style={disabledStyles.select} underlayColor={Colors.lightGray} onPress={() => { setDisplayPanel(!displayPanel)}}>
                                <View>
                                    <View style={styles.rateContainer}>
                                        {optionsPanel()}
                                    </View>
                                    <Text style={{ textAlign : 'center'}}>{displayTitle()}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
    
    if(props.display){
        return(
            // <TouchableWithoutFeedback style={styles.absoluteBackroud} onPress={() => {setDisplayPanel(false)}}>
                <KeyboardAvoidingView style={{flex : 1}} behavior={getBehavior()} keyboardVerticalOffset={120}>
                    {props.children}
                    {input}
                </KeyboardAvoidingView>
            // </TouchableWithoutFeedback>
        )
    }
    else {
        return(
            <KeyboardAvoidingView style={{flex : 1}} behavior={getBehavior()} keyboardVerticalOffset={120}>
                {props.children}
            </KeyboardAvoidingView>
        )
    }
}

export const BottomInput = (props : Props) => {
    let textInput: TextInput | null = null;

    const disabledStyles : {input : any[],select : any[]} = {input : [styles.input], select : [styles.rateTitle]};
    if(!props.enabled){
        disabledStyles.input.push({backgroundColor : Colors.lightGray, borderBottomRightRadius: 0,borderTopRightRadius : 0});
        disabledStyles.select.push({backgroundColor : Colors.disabled,});
    }
    
    const input = <View style={{height : 50}}>
                    <View style={styles.input_container}>
                        <View style={styles.input_sub_container}>
                            <TextInput editable={props.enabled} style={disabledStyles.input} placeholder='Comentario...' 
                                autoFocus={props.focus} onChangeText={props.callBackText}
                                ref={input => { textInput = input }}
                                onSubmitEditing={(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
                                    if(props.callBackEnter){
                                        props.callBackEnter(e);
                                        textInput?.clear();
                                    }
                                }}/>
                        </View>
                    </View>
                </View>
    
    if(props.display){
        return(
            <TouchableWithoutFeedback style={styles.absoluteBackroud}>
                <KeyboardAvoidingView style={{flex : 1}} behavior={getBehavior()} keyboardVerticalOffset={120}>
                    {props.children}
                    {input}
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
    else {
        return(
            <KeyboardAvoidingView style={{flex : 1}} behavior={getBehavior()} keyboardVerticalOffset={120}>
                {props.children}
            </KeyboardAvoidingView>
        )
    }
}



const styles = StyleSheet.create({
    section_container : {
        backgroundColor: 'white',
        // justifyContent: 'center',
        // marginTop: 40,
        padding: 5,
        borderRadius: 10,
        marginBottom: 25,
    },
    input_container : {
        // alignSelf: 'flex-end',
        justifyContent: 'center',
        backgroundColor: Colors.lightGray,
        padding:10,
        flex: 1,
    },
    input_sub_container : {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    rate : {
        borderRadius: 10,
        alignSelf: 'center',
        flex: 1,
        fontSize: 15,
    },
    input : {
        flex:3,
        borderRadius: 10,
        height: 25,
        width: 250,
        backgroundColor: 'white',
        fontSize: 15,
        padding: 0,
        paddingLeft: 10,
    },
    separator: {
        marginTop: 10,
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
    },
    picker : {
        width : 50,
        height : 25,
        alignSelf : 'center',
        backgroundColor : 'red',
    },
    absoluteBackroud : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    rateTitle : {
        backgroundColor : '#cad2de',
        flex : 1,
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    rateContainer : {
        backgroundColor : '#cad2de',
        position : 'absolute',
        bottom: 25,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        zIndex: 40,
    },
    rateOption : {
        width: 95,
        height: 35,
        display: 'flex',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        position: 'relative'
    },
    rateValue : {
        fontWeight : 'bold',
    }
})