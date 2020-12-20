import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function Reply(reply=null){
    return (
        <View style={styles.replies_container}>
            <Text style={styles.replies_name}>{reply.userName}</Text>
            <Text style={styles.replies_text}>{reply.reply}</Text>   
        </View>
    );
}

function Comment(body=null){
    const replies = body.replies.map( reply => {
        return <Reply {...reply} key={reply.id}/>
    });
    return (
        <View style={styles.comments_container}>
            <Text style={styles.user_name}>{body.userName}</Text>
            <Text style={styles.comment_text}>{body.comment}</Text>
            <Text style={styles.replies}>Respuestas:</Text> 
            {replies}    
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
    replies : {
        fontSize: 15,
        fontWeight: '400',
        color: '#828282',
        marginTop: 5,
        paddingLeft: 10
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

    }
})

export default Comment;