import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';

export default function WelcomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#CBC3E3', fontSize: 30 }}>Welcome to UniGo</Text>
      <Text style={{ color: 'black', fontSize: 15 }}>We are here to get you home safely!</Text>
      <TouchableOpacity
      style={styles.requestbutton}
        onPress={() => navigation.navigate('PickupScreen')}
      >
        <Text style={styles.submitbuttonText}>Request a ride</Text>
      </TouchableOpacity>

    </View>
  );
}