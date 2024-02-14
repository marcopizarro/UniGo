import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styleSheet'; // Adjust the path to your styles file

export default function DestinationScreen() {
    const [destination, setDestination] = useState('');
    const handleDestination = () => {
        console.log('Destination', { destination });
      };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <TextInput
        style={styles.input}
        placeholder="Type in your destination"
        value={destination}
        onChangeText={setDestination}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleDestination}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}