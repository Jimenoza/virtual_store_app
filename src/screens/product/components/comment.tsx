import React, { ReactElement , useState} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, TextInput, GestureResponderEvent} from 'react-native';
import { Comment as CommentType, Reply as ReplyType} from '../../../interfaces';
import { Colors, Stars, BottomInput} from '../../../common';

interface ReplyProps {
    body : CommentType,
    content? : { text : string, user : string}
    onPress?: ((event: GestureResponderEvent) => void)
    newReply: boolean;
}

export const SingleReply = ( props : {userName: string, text: string} ): ReactElement => {
    return (
        <View style={styles.replies_container}>
            <Text style={styles.replies_name}>{props.userName}</Text>
            <Text style={styles.replies_text}>{props.text}</Text>   
        </View>
    );
}

const Comment = (props: ReplyProps): ReactElement => {
    const [newReply,setNewReply] = useState<boolean>(props.newReply);
    const replies_style: any = {
        fontSize: 15,
        fontWeight: '400',
        color: Colors.darkGray,
        marginTop: 5,
        paddingLeft: 10
    };
    const replies = props.body.replies.map( (reply : ReplyType) => {
        return <SingleReply text={reply.reply} userName={reply.userName} key={reply.id}/>
    });
    const displayReply = () => {
        if(newReply && props.content){
            return <SingleReply text={props.content.text} userName={props.content.user}/>
        }
    }
    const displayReplyButton = () => {
        if(!newReply){
            return (
                <TouchableHighlight style={styles.reply} underlayColor={Colors.darkBlue} 
                onPress={(e) => {
                    setNewReply(true);
                    if(props.onPress){props.onPress(e)}
                }}>
                    <Text style={styles.reply_text}>Dejar una respuesta</Text>
                </TouchableHighlight>
            );
        }
    }

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
            {displayReply()}
            {displayReplyButton()}
        </View>
    )
}

export const SingleComment = (props : {stars: number, text : string, name : string}) =>{
    return (
        <View style={styles.comments_container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.user_name}>{props.name}</Text>
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