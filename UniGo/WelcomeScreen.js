import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styleSheet'; // Adjust the path to your styles file

export default function WelcomeScreen() {
  /*const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login credentials', { email, password });
  };*/

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: '#CBC3E3',fontSize: 30}}>Welcome to UniGo!</Text>
        <Button  
        title="Request a Ride" 
        />
    </View>
  );
}