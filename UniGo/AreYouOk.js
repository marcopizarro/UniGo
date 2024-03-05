import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';
import { db } from './firebaseConfig'; // Adjust the path to your firebaseConfig file
import { addDoc, collection, doc } from 'firebase/firestore';
import { auth } from './firebaseConfig'; // Adjust the path to your firebaseConfig file

export default function AreYouOk({ route, navigation }) {

  const { pickup, destination } = route.params;

  const [selectedButton, setSelectedButton] = useState(null);

  // Function to handle when a selection button is pressed
  const handleButtonPress = (buttonKey) => {
    setSelectedButton(buttonKey); // Set the selected button state
  };

  // Function to get the style of the button depending on whether it's selected
  const getButtonStyle = (buttonKey) => {
    return buttonKey === selectedButton ? styles.selectedButton : styles.button;
  };

  // Function to get the text style depending on whether it's selected
  const getButtonTextStyle = (buttonKey) => {
    return buttonKey === selectedButton ? styles.selectedButtonText : styles.buttonText;
  };

  // Function to handle when the submit button is pressed
  const handleSubmit = () => {
    if (selectedButton !== null) {
      //send the status to the database
      try {
        const docRef = addDoc(collection(db, "rideRequests"), {
          user: auth.currentUser.uid,
          pickupLoc: pickup,
          destinationLoc: destination,
          rider: selectedButton,
          time: new Date(),
          status: "waiting"
        });
      }
      catch (e) {
        console.error("Error adding document: ", e);
      }
      // Navigate to the next screen if a button has been selected
      navigation.navigate('WaitingToBeMatched', { pickup: pickup, destination: destination }); // Replace with your actual next screen name
    } else {
      // You can add an alert here if no option is selected
      alert('Please select an option before submitting.');
    }
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.headline1}>Waiting to be matched...</Text>
      <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginBottom: 15 }}>
        How are things going?
      </Text>

      {['notWell', 'ok', 'noRush'].map((buttonKey) => (
        <TouchableOpacity
          key={buttonKey}
          style={getButtonStyle(buttonKey)}
          onPress={() => handleButtonPress(buttonKey)}
        >
          <Text style={getButtonTextStyle(buttonKey)}>
            {buttonKey === 'notWell' && 'Not too well, ASAP needed'}
            {buttonKey === 'ok' && 'All ok, the faster the better'}
            {buttonKey === 'noRush' && 'No rush'}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
