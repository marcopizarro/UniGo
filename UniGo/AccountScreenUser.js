import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { styles } from './StyleSheet'; // Make sure this is correctly imported

const gifs = [
  'https://media.giphy.com/media/j72ap4TgkIdLY4bBKD/giphy.gif',
  'https://media.giphy.com/media/0SmaDKOU78VQwf3IdN/giphy.gif',
  'https://media.giphy.com/media/eVFNEZreqJaPKXahr5/giphy.gif',
  'https://media.giphy.com/media/RKJ1vk4mGnOgS9wF5P/giphy.gif'
];

const AccountScreenUser = () => {
  const [selectedGif, setSelectedGif] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigation = useNavigation();

  // Function to select a random GIF URL
  useEffect(() => {
    const getRandomGif = () => {
      const randomIndex = Math.floor(Math.random() * gifs.length);
      return gifs[randomIndex];
    };
    
    setSelectedGif(getRandomGif());
  }, []); // This effect runs only once when the component mounts

  // Fetch user-specific data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
          setphoneNumber(userData.phoneNumber || '');
        } else {
          console.log('No user data found');
        }
      }
    };
    
    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, { firstName, lastName, phoneNumber }, { merge: true });
      setIsEditMode(false);
      Alert.alert("Success", "Your data has been saved.");
    } else {
      Alert.alert("Error", "No user signed in.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); // Navigate to login screen
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#D6E4FF' }}>
      {selectedGif && (
        <Image
          source={{ uri: selectedGif }}
          style={{ width: 280, height: 300, marginTop: 30, marginBottom: 30 }}
          resizeMode="contain"
        />
      )}
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        editable={isEditMode}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        editable={isEditMode}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setphoneNumber}
        style={styles.input}
        editable={isEditMode}
      />
      {isEditMode ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          <Button title="Edit" onPress={() => setIsEditMode(true)} />
          <Button title="Logout" onPress={handleLogout} color="red" />
        </View>
      )}
    </View>
  );
};

export default AccountScreenUser;
