import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#003FFA'}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold', marginBottom: 80 }}>Welcome!</Text>
        <Image
        source={require('./assets/logo.png')} // Make sure to replace './path/to/your/logo.png' with the actual path to your logo image
        style={{ width: 300, height: 200, marginBottom: 30 }} // Adjust the size of your logo as needed
        resizeMode="contain"
        />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>We are here to get you home safely!</Text>
        <TouchableOpacity
          style={styles.requestbutton}
          onPress={() => navigation.navigate('LocationsScreen')}
        >
          <Text style={styles.requestbuttonText}>Request a ride</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}