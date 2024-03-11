import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { useNavigation } from '@react-navigation/native';

export default function ProfileButton() {
    const  navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.profileButton}
      onPress={() => {
        navigation.navigate('Profile');
      }}
    >
      <Image
        source={require('./assets/profile.png')}
        style={styles.profileIcon}
      />
    </TouchableOpacity>
  );
}