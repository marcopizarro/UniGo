import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet';
import { Button } from 'react-native';
import { db } from './firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from './firebaseConfig';

export default function WaitingMatchDriverScreen({ route, navigation }) {
  const [status, setStatus] = useState(0);
  const handleSubmit = () => {
    console.log('Submit');
    if (status === 0) {
      alert('Please select your status');
    }
    try {
      const docRef = addDoc(collection(db, "rideRequests"), {
        user: auth.currentUser.uid,
        pickupLoc: route.params.pickup,
        destinationLoc: route.params.destination,
        rider: status,
        time: new Date(),
        status: "waiting"
      });
      console.log("Document written with ID: ", docRef.id);
      // navigation.navigate('');
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Waiting to be matched ... </Text>
      <Text>How are things going?</Text>
      <TouchableOpacity style={styles.button} onPress={() => setStatus(1)}>
        <Text style={styles.buttonText}>Not too well, ASAP needed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setStatus(2)}>
        <Text style={styles.buttonText}>All ok, the faster the better</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setStatus(3)}>
        <Text style={styles.buttonText}>No rush</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitbuttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}