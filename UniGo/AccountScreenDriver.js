import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import { auth, db } from './firebaseConfig';
import { styles } from './StyleSheet'; // Make sure this is correctly imported



const AccountScreenDriver = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [carType, setCarType] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [driverImage, setDriverImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigation = useNavigation();

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
          setCarType(userData.carType || '');
          setLicensePlate(userData.licensePlate || '');
          // setDriverImage(userData.driverImage || null); // Implement this part based on how you store and fetch images
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
      await setDoc(userRef, {
        firstName, 
        lastName, 
        phoneNumber, 
        carType, 
        licensePlate,
        // driverImage: driverImage.uri, // Assuming you will store the image URI. Adjust as necessary for your image handling setup.
      }, { merge: true });
      setIsEditMode(false);
      Alert.alert("Success", "Your data has been saved.");
    } else {
      Alert.alert("Error", "No user signed in.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); // This will navigate the user to the Login screen and reset the navigation stack
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setDriverImage(source);
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#D6E4FF' }}>
      <TouchableOpacity onPress={handleImageUpload} style={styles.imageUploadBtn}>
        {driverImage ? (
          <Image source={driverImage} style={styles.imagePreview} />
        ) : (
          <Image source={require('./assets/account.png')} style={styles.imagePreview} />
        )}
      </TouchableOpacity>
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
      <TextInput
        placeholder="CarType"
        value={carType}
        onChangeText={setCarType}
        style={styles.input}
        editable={isEditMode}
      />
      <TextInput
        placeholder="Driver License Plate"
        value={licensePlate}
        onChangeText={setLicensePlate}
        style={styles.input}
        editable={isEditMode}
      />
      {isEditMode ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={() => setIsEditMode(true)} />
          <Button title="Logout" onPress={handleLogout} color="red" />
        </View>
      )}
    </View>
  );
};

  export default AccountScreenDriver;
