import React from 'react';
import { ActivityIndicator ,FlatList ,View, StyleSheet, TouchableOpacity } from 'react-native';
import RoomItem from './Ui/RoomItem_';
import { Ionicons } from '@expo/vector-icons';
import db from '../firebase';
import { useEffect } from 'react/cjs/react.development';
import { useState } from 'react';

function Lobby({ navigation, route }) {
    const { username } = route.params;
    let [rooms, setRooms] = useState([]);

    useEffect(() => {
        db
        .collection('Rooms')
        .where('capacity', '<', 10)
        .onSnapshot(snap => {
            snap.docChanges().forEach((change, i) => {
                if(change.type === 'added') {
                    if(change.doc.data().capacity === 0) {
                        change.doc.delete();
                    }
                    else
                        setRooms(rooms => [...rooms, {...change.doc.data()}]);
                }
                else if(change.type === 'modified') {
                    setRooms(rooms => {
                        let newRooms = [...rooms]
                        const data = change.doc.data();
                        const index = rooms.findIndex(r => r.key === data.key);
                        newRooms[index] = data;
                        return newRooms;
                    });
                }
                else {
                    setRooms(rooms => {
                        let newRooms = [...rooms];
                        const data = change.doc.data();
                        const index = rooms.findIndex(r => r.key === data.key);
                        newRooms.splice(index, 1);
                        return newRooms;
                    });
                }
            });
        });
    }, []);
    
    const createRoom = () => {
        navigation.navigate('Create Room', { username: username });
    }
    
    const handleRoomEnter = (key) => {
        navigation.navigate('Chat Room', { username: username, key: key});
    }
    
    const renderItem = ({ item }) => (
        <RoomItem item={item} handleRoomEnter={handleRoomEnter}/>
    );

    return (
        <View style={styles.root}>
            {
                rooms.length !== 0
                ? 
                (<FlatList 
                    data={rooms}
                    renderItem={renderItem}
                    style={styles.list}
                />)
                :
                (<View style={{paddingTop: 20}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>)
            }
            <TouchableOpacity 
                style={styles.addBtn} 
                activeOpacity={0.9}
                onPress={createRoom}
            >
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
   root: {
       flex: 1,
       backgroundColor: 'white',
       paddingTop: 0,
       paddingBottom: 0
   },
   addBtn: {
       backgroundColor: '#32292F',
       borderRadius: 30,
       width: 60,
       height: 60,
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       position: 'absolute',
       bottom: 20,
       right: 20
   },
   list: {
       padding: 20
   }
});

export default Lobby;