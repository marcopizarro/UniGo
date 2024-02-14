import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';

export default function WaitingMatchDriverScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Waiting to be matched ... </Text>
      <Text>How are things going?</Text>
      <Button title="Not too well, ASAP needed" />
      <Button title="All ok, the faster the better" />
      <Button title="No rush" />
    </View>
  );
}