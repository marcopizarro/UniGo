import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function WelcomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#95A2F1', fontSize: 40, fontWeight: 'bold', marginBottom: 80 }}>Welcome to UniGo</Text>
        <Text style={{ color: 'black', fontSize: 20, marginBottom: 20 }}>We are here to get you home safely!</Text>
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