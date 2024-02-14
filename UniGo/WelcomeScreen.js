import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';

export default function WelcomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#CBC3E3', fontSize: 30 }}>Welcome to UniGo!</Text>
      <Button
        onPress={() => navigation.navigate('PickupScreen')}
        title="Request a Ride"
      />
    </View>
  );
}