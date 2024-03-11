import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, Button} from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file

export default function WaitingToBeMatched({ route, navigation }) {

  const { pickup, destination } = route.params; 

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#E1E1E1'}}>
            <Text style={{ color: '#167DEB', fontSize: 30, fontWeight: 'bold', marginBottom: 30, padding: 20, textAlign: 'center' }}
              >Thank you for letting us know!</Text>
            <Text style={{ color: 'black', fontSize: 25, fontWeight: '600', marginBottom: 0, padding: 30, textAlign: 'center' }}
              >Your hero for the night is being called...</Text>

            <Image
              source={{ uri: 'https://media.giphy.com/media/WySK0nQiJKLy25HLhp/giphy.gif' }}
              style={{ width: 410, height: 250, marginLeft: 20, marginRight: 20}}
              resizeMode='contain'
              />
            <Button
            title="Pretend you've matched"
            onPress={() => navigation.navigate('WaitingForDriverScreen', { pickup : pickup, destination: destination })}
          />
        </View>
      );

}