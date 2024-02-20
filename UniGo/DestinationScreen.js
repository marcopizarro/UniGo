import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file

export default function DestinationScreen({ route, navigation }) {
  const [destination, setDestination] = useState('');
  const handleDestination = () => {
    console.log('Destination', { destination });
    navigation.navigate('WaitingMatchDriverScreen', { pickup: route.params.pickup, destination });
  };

  return (
    <View style={{ flexDirection: "row", padding: 70 }}>

      <TextInput
        style={styles.input}
        placeholder="Type in your destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleDestination}>
        <Text style={styles.submitbuttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}