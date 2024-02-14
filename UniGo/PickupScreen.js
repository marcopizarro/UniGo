import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';

export default function PickupScreen({ navigation }) {
  const [pickup, setPickup] = useState('');
  const handlePickup = () => {
    console.log('Pickup', { destination });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder="Type in pickup location"
      />

      <Button title="Get current location" />
      <View />
      <Button
        onPress={() => navigation.navigate('DestinationScreen')}
        title=" Submit "
      />
    </View>
  );
}