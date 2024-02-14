import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file

export default function DestinationScreen({ navigation }) {
  const [destination, setDestination] = useState('');
  const handleDestination = () => {
    console.log('Destination', { destination });
    navigation.navigate('WaitingMatchDriverScreen');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <TextInput
        style={styles.input}
        placeholder="Type in your destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TouchableOpacity style={styles.button} onPress={handleDestination}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}