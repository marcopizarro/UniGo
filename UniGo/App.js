import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { styles } from './StyleSheet';
import Login from './login';
export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}