import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';
import { db } from './firebaseConfig'; // Adjust the path to your firebaseConfig file
import { addDoc, collection, doc } from 'firebase/firestore';
import { auth } from './firebaseConfig'; // Adjust the path to your firebaseConfig file
import { CommonActions } from '@react-navigation/native';

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
        docRef.then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          const rideID = docRef.id;
          // navigation.navigate('RideInProgress', { pickup, destination, rideID }); // Replace with your actual next screen name
          // navigation.replace('RideInProgress', { pickup, destination, rideID });
          // const resetAction = CommonActions.reset({
          //   index: 0,
          //   actions: [NavigationActions.navigate({ routeName: 'RideInProgress', params: { pickup, destination } })],
          // });
          // navigation.dispatch(resetAction);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'RideInProgress', params: { pickup, destination, rideID } },
              ],
            })
          );


        });
      }
      catch (e) {
        console.error("Error adding document: ", e);
      }

      // Navigate to the next screen if a button has been selected
    } else {
      // You can add an alert here if no option is selected
      alert('Please select an option before submitting.');
    }
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.headline1}>Are you in a vulnerable situation?</Text>

      {/* Yes Button */}
      <TouchableOpacity
        style={getButtonStyle('yes')}
        onPress={() => handleButtonPress('yes')}
      >
        <Text style={getButtonTextStyle('yes')}>Yes</Text>
      </TouchableOpacity>

      {/* No Button */}
      <TouchableOpacity
        style={getButtonStyle('no')}
        onPress={() => handleButtonPress('no')}
      >
        <Text style={getButtonTextStyle('no')}>No</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
