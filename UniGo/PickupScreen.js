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
        style={styles.input}
        placeholder="Type in pickup location"
        textAlign='center'
        value={pickup}
        onChangeText={setPickup}
      />

      <Text> OR</Text>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get current location</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.submitButton}
        onPress={() => navigation.navigate('DestinationScreen', { pickup })} >
        <Text style={styles.submitbuttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}