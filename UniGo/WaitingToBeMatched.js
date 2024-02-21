import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';

export default function WaitingToBeMatched({ navigation }) {

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'semibold', marginBottom: 30, padding: 20 }}>Thank you for letting us know!</Text>
          <Text style={{ color: '#736CC1', fontSize: 30, fontWeight: 'bold', marginBottom: 80, padding: 20 }}>Your hero for the night it being called..</Text>
        </View>
      );

}