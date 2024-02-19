import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';

export default function WaitingMatchDriverScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Waiting to be matched ... </Text>
      <Text>How are things going?</Text>
      <TouchableOpacity style={styles.button} >
      <Text style={styles.buttonText}>Not too well, ASAP needed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
      <Text style={styles.buttonText}>All ok, the faster the better</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
      <Text style={styles.buttonText}>No rush</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} >
      <Text style={styles.submitbuttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}