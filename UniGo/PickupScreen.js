import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styleSheet'; // Adjust the path to your styles file

export default function PickupScreen() {
    
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
        placeholder="Type in pickup location"
        />

      <Button title = "Get current location"/>
      <View />
      <Button
        title=" Submit "
      />
    </View>
  );
}