import React, { useState } from 'react'; 

import { Text, TextInput, TouchableOpacity, View } from 'react-native'; 

import { styles } from './StyleSheet'; // Adjust the path to your styles file 

import { Button } from 'react-native'; 

import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';


 

export default function PickupScreen() { 

  const [pickup, setPickup] = useState(''); 
  const navigation = useNavigation();

  const handlePickup = () => { 

    console.log('Pickup', { pickup }); 

  }; 


  const getCurrentLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      console.log('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    setPickup({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };


  return ( 

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 

            <TextInput 

              style={styles.input} 

              placeholder="Type in pickup location" 

              textAlign='center' 

            /> 

      <Text> OR</Text> 

 

      <TouchableOpacity style={styles.button} onPress={getCurrentLocation}> 

        <Text style={styles.buttonText}>Get current location</Text> 

      </TouchableOpacity> 

 

       

      <TouchableOpacity style={styles.submitButton} onPress={() => {
          if (pickup) {
            handlePickup();
            navigation.navigate('DestinationScreen', {
              pickup: pickup,
            });
          } else {
            alert('Please use the "Get current location" button to set the pickup location');
          }}} > 

      <Text style={styles.submitbuttonText}>Submit</Text> 

      </TouchableOpacity> 

    </View> 

  ); 

} 

 

