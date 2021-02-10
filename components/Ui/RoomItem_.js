import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const RoomItem_ = ({ item, handleRoomEnter }) => {
    return (
        <TouchableOpacity style={styles.root} onPress={() => handleRoomEnter(item.key)} activeOpacity={0.9}>
            <Text style={styles.text}>{ item.name }</Text>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.capacity}/10</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#5762D5',
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 13,
        marginBottom: 20
    },
    text: {
        color: 'white'
    },
    badge: {
        backgroundColor: '#32292F',
        borderRadius: 20,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15
    },
    badgeText: {
        color: 'white'
    }
});

export default RoomItem_;