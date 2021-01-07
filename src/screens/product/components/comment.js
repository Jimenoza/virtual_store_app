import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import { Stars } from '../../../common/utils';

function Reply(reply=null){
    return (
        <View style={styles.replies_container}>
            <Text style={styles.replies_name}>{reply.userName}</Text>
            <Text style={styles.replies_text}>{reply.reply}</Text>   
        </View>
    );
}

function Comment(body=null){
    const replies_style = {
        fontSize: 15,
        fontWeight: '400',
        color: '#828282',
        marginTop: 5,
        paddingLeft: 10
    };
    const replies = body.replies.map( reply => {
        return <Reply {...reply} key={reply.id}/>
    });
    if(body.replies.length === 0){
        replies_style['display'] = 'none';
    }
    return (
        <View style={styles.comments_container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.user_name}>{body.userName}</Text>
                <Stars rate={body.calification} size={25}/>
            </View>
            <Text style={styles.comment_text}>{body.comment}</Text>
            <Text style={replies_style}>Respuestas:</Text> 
            {replies}
            <TouchableHighlight style={styles.reply} underlayColor="#08609e">
                <Text style={styles.reply_text}>Dejar una respuesta</Text>
            </TouchableHighlight>  
        </View>
    )
}

export function SingleComment(props){
    return (
        <View style={styles.comments_container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.user_name}>Usuario dummy</Text>
                <Stars rate={props.stars} size={25}/>
            </View>
            <Text style={styles.comment_text}>{props.text}</Text>  
        </View>
    )
}


const styles = StyleSheet.create({
    comments_container : {
        justifyContent: 'flex-start',
        margin: 15,
        fontFamily: 'Rubik',
        textAlign: 'left',
        borderTopWidth: 1,
        borderTopColor: '#1C6EA4',
        borderStyle: 'solid'
    },
    user_name : {
        fontSize: 20,
        color: '#3256C3',
        fontStyle: 'italic',

    },
    comment_text : {
        fontSize: 15,
    },
    replies_container : {
        paddingLeft: 30
    },
    replies_name : {
        fontSize: 15,
        color: '#3256C3',
    },
    replies_text : {
        fontSize: 15,
        fontWeight: '400',

    },
    reply : {
        flex: 1,
        backgroundColor: '#0e8ce4',
        height: 37.5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 30,
        marginRight: 30,
    },
    reply_text : {
        fontSize: 16,
        color: 'white'
    },
})

export default Comment;