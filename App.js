import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Lobby from './components/Lobby';
import ChatRoom from './components/ChatRoom';
import CreateRoom from './components/CreateRoom';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar translucent/>
        <SafeAreaView style={styles.root}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} 
            options={{ headerShown: false }}
            />
            <Stack.Screen 
            name="Lobby" component={Lobby} 
            options={{
              title: 'Online Chat Rooms',
            }}
            />
            <Stack.Screen 
            name="Chat Room" component={ChatRoom} 
            options={({route}) => ({title: route.params.name})}
            />
            <Stack.Screen 
            name="Create Room" component={CreateRoom}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    root: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: 'white'
    }
})