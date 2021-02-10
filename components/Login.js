import React from 'react';
import { useState } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import Button from './Ui/AppButton_';
import TextInput from './Ui/TextInput_';
import whiteLogo from '../assets/logo-white.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

function Login({ navigation }) {
    let [username, setUsername] = useState('');

    useEffect(() => {
        (async() => {
            const user = await AsyncStorage.getItem('@username');
            if(user)
                setUsername(user)
        })();
    }, []);

    const removeUser = async () => {
        const user = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(user)
    }

    const handleEnter = async () => {
        if(username === '') return;
        try {
            await AsyncStorage.setItem('@username', username)
            navigation.navigate('Lobby', { username })
        } catch(e) {
            setUsername('')
        }
    }

    return (
        <View style={styles.root}>
            <View style={styles.titleContainer}>
                <Image 
                    source={whiteLogo}
                    style={styles.logo}
                />
                <Text style={styles.title}>
                    Strangers Chat
                </Text>
            </View>
            <TextInput
                placeholder="Username" 
                value={username}
                onChangeText={setUsername}
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
        backgroundColor: '#5762D5',
        padding: 20,
        alignItems: 'center'
    },
    btn: {
        marginLeft: 'auto',
        backgroundColor: '#32292F',
    },
    titleContainer: {
        marginBottom: 40,
        marginTop: 50,
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 5
    },
    logo: {
        width: 35,
        height: 35,
        margin: 'auto'
    },
    input: {
        width: '100%',
        marginBottom: 15
    }
})

export default Login;