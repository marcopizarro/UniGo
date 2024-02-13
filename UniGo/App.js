import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import Login from './Login';
import { styles } from './styleSheet'; // 


export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}