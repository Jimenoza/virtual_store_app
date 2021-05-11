import React, { ReactElement } from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import { Stars } from '../../../common/utils';
import { Colors } from '../../../common/styles';
import { Comment as CommentType, Reply as ReplyType} from '../../../interfaces';

interface CommentProps {
    body : CommentType,
}

interface ReplyProps {
    body : ReplyType,
}

function Reply(reply:ReplyProps){
    return (
        <View style={styles.replies_container}>
            <Text style={styles.replies_name}>{reply.body.userName}</Text>
            <Text style={styles.replies_text}>{reply.body.reply}</Text>   
        </View>
    );
}

function Comment(props: CommentProps): ReactElement{
    const replies_style: any = {
        fontSize: 15,
        fontWeight: '400',
        color: Colors.darkGray,
        marginTop: 5,
        paddingLeft: 10
    };
    const replies = props.body.replies.map( (reply : ReplyType) => {
        return <Reply body={reply} key={reply.id}/>
    });
    if(props.body.replies.length === 0){
        replies_style['display'] = 'none';
    }
    return (
        <View style={styles.comments_container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.user_name}>{props.body.userName}</Text>
                <Stars rate={props.body.calification} size={25}/>
            </View>
            <Text style={styles.comment_text}>{props.body.comment}</Text>
            <Text style={replies_style}>Respuestas:</Text> 
            {replies}
            <TouchableHighlight style={styles.reply} underlayColor={Colors.darkBlue}>
                <Text style={styles.reply_text}>Dejar una respuesta</Text>
            </TouchableHighlight>  
        </View>
    )
}

export function SingleComment(props : any){
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
        borderTopColor: Colors.darkBlue,
        borderStyle: 'solid'
    },
    user_name : {
        fontSize: 20,
        color: Colors.bluePrimary,
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
        color: Colors.bluePrimary,
    },
    replies_text : {
        fontSize: 15,
        fontWeight: '400',

    },
    reply : {
        flex: 1,
        backgroundColor: Colors.bluePrimary,
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