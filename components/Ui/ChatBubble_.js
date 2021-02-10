import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ChatBubble_ = ({ item, username }) => {
    return (
        <View>
            {item.sender !== username && (<Text style={{paddingLeft: 10, fontSize: 13}}>{item.sender}</Text>)}
            <View style={[styles.root, item.sender === username && styles.me]}>
                <Text style={[styles.text, item.sender === username && styles.textMe]}>{item.message}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        padding: 15,
        maxWidth: '65%',
        marginBottom: 10,
        marginRight: 'auto',
    },
    me: {
        backgroundColor: '#5762D5',
        marginLeft: 'auto',
        marginRight: 0,
    },
    text: {
        color: 'black'
    },
    textMe: {
        color: 'white'
    }
});

export default ChatBubble_;