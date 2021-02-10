import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextInput from './Ui/TextInput_';
import Button from './Ui/AppButton_';
import { useState } from 'react';
import db from '../firebase';

function CreateRoom({ navigation, route }) {
    const { username } = route.params;
    let [roomName, setRoomName] = useState('');

    const handleEnter = () => {
        if(roomName === '') return;

        let key;

        db.collection('Rooms').add({}).then(d => {
            key = d.id;
            db.collection('Rooms').doc(d.id).set({
                name: roomName,
                key: d.id,
                capacity: 0
            });
        });

        navigation.navigate('Chat Room', { username, key });
    }

    return (
        <View style={styles.root}>
            <TextInput
                placeholder="Room Name" 
                value={roomName}
                onChangeText={setRoomName}
                style={styles.input}
            />
            <Button 
                title="Enter" 
                style={styles.btn}
                textStyle={{color: 'white'}}
                onPress={handleEnter}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    btn: {
        marginLeft: 'auto',
        backgroundColor: '#5762D5',
    },
    input: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: '#E0E0E0'
    }
});

export default CreateRoom;