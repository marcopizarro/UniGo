import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file



const destinations = {
  'Toyon' : {latitude : 37.42612149402934, longitude : -122.16339823054155}, 
  'EVGR A' : {latitude : 37.424602763750606, longitude : -122.15899543978708}, 
  'EVGR B' : {latitude : 37.42561006559691, longitude : -122.15816698026677}, 
  'EVGR C' : {latitude : 37.427174633537824, longitude : -122.15710770355503}, 
  'EVGR D' : {latitude : 37.42766289259087, longitude : -122.15611391095138}, 
  'Mirrielees House' : {latitude : 37.423701747176914, longitude : -122.15979964411721}, 
  'Studio 1' : {latitude : 37.42302416222159, longitude : -122.15966850355521}, 
  'Meier Hall' : {latitude : 37.42533411393249, longitude : -122.17502812499434}, 
  'Lagunita Court' : {latitude : 37.425590017431155, longitude : -122.17637880355508}, 
  'Branner Hall' : {latitude : 37.425490434286615, longitude : -122.16277229465487}
};

export default function DestinationScreen({ route, navigation }) {
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { pickup } = route.params; 

  

  const handleDestinationChange = (text) => {
    const filteredDestinations = Object.keys(destinations).filter((d) => d.toLowerCase().includes(text.toLowerCase()));
    setSuggestions(filteredDestinations);
    setDestination(text);
  };

  const handleDestinationSelect = (destination) => {
    setDestination(destination);
    navigation.navigate('AreYouOk', { pickup : pickup, destination: destinations[destination] });
    // passing the coordinates of pickup and destination
  };

  return (
    <View style={ {flexDirection: "column", padding:70}}>
      <TextInput
        style={styles.input}
        placeholder="Enter your destination"
        value={destination}
        onChangeText={handleDestinationChange}
      />
      {suggestions.length > 0 && (
        <View>
          {suggestions.map((suggestion) => (
            <Text key={suggestion} onPress={() => handleDestinationSelect(suggestion)} style={{ padding: 10 }}>
              {suggestion}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}