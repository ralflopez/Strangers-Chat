import React from 'react';
import { Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TextInput from '../components/Ui/TextInput_';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import ChatBubble from './Ui/ChatBubble_';
import { useEffect } from 'react/cjs/react.development';
import firebase from 'firebase/app';
import 'firebase/firestore';
import db from '../firebase';

function ChatRoom({ navigation, route }) {
    const { username, key } = route.params;
    
    let [message, setMessage] = useState('');
    let [chats, setChats] = useState([]);

    useEffect(() => {
        navigation.addListener('beforeRemove', showLeaveAlert);

        //join room
        db.collection('Rooms')
        .doc(key)
        .update({
            capacity: firebase.firestore.FieldValue.increment(1)
        });

        //fetch catch from firebase
        db.collection('Rooms')
        .doc(key)
        .collection('messages')
        .onSnapshot(snap => {
            const docs = snap.docChanges();
            docs.forEach(doc => {
                if(doc.type === 'added') {
                    setChats(chat => {
                       let newChat = [...chat];
                       newChat.unshift(doc.doc.data());
                       return newChat;
                    });
                }
            });
        });

    }, []);

    const sendMessage = () => {
        db.collection('Rooms')
        .doc(key)
        .collection('messages')
        .add({
            message: message,
            sender: username,
            key: message.substring(0, 5)+username+Math.random()
        })
        .then(() => setMessage(''));
    }

    const renderChatBubble = ({item}) => (<ChatBubble item={item} username={username}/>);

    const showLeaveAlert = (e) => {
        e.preventDefault();

        Alert.alert(
            'Leave',
            'Do you really want to leave?',
            [
                { text: 'No', style: 'cancel'},
                { text: 'Yes', style: 'destructive' ,onPress: () => {
                    db.collection('Rooms')
                    .doc(key)
                    .update({
                        capacity: firebase.firestore.FieldValue.increment(-1)
                    });
                    navigation.dispatch(e.data.action);
                }},
            ]
        );
    };

    return (
        <View style={styles.root}>
            <View style={styles.msgArea}>
                <FlatList 
                data={chats}
                renderItem={renderChatBubble}
                style={styles.msgList}
                inverted={true}
                />
            </View>
            <View style={styles.inputArea}>
                <TextInput 
                    style={styles.textInput}
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.send} activeOpacity={0.9} onPress={sendMessage}>
                    <Ionicons name="md-send-sharp" size={25} color="white" style={styles.sendIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    msgArea: {
        flex: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    inputArea: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        margin: 0, 
        height: 50,
        backgroundColor: '#E0E0E0',
        fontSize: 15,
        marginRight: 12,
        flex: 5
    },
    send: {
        backgroundColor: '#5762D5',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    sendIcon: {
        position: 'relative',
        left: 3
    },
    msgList: {
        marginTop: 10,
    }
});

export default ChatRoom;