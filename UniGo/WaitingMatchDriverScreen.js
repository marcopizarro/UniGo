import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet';
import { Button } from 'react-native';
import { db } from './firebaseConfig';
import { addDoc, collection, doc } from 'firebase/firestore';
import { auth } from './firebaseConfig';

export default function WaitingMatchDriverScreen({ route, navigation }) {
  const [status, setStatus] = useState(0);

  const handleSelect = (status) => {
    const selectColor = "lightblue";
    const defaultColor = styles.button.backgroundColor;
    const one = document.getElementById("status1");
    const two = document.getElementById("status2");
    const three = document.getElementById("status3");
    if (one === null || two === null || three === null) {
      return;
    }
    if (status === 1) {
      one.style.backgroundColor = selectColor;
      two.style.backgroundColor = defaultColor;
      three.style.backgroundColor = defaultColor;
    }
    else if (status === 2) {
      one.style.backgroundColor = defaultColor;
      two.style.backgroundColor = selectColor;
      three.style.backgroundColor = defaultColor;
    }
    else if (status === 3) {
      one.style.backgroundColor = defaultColor;
      two.style.backgroundColor = defaultColor;
      three.style.backgroundColor = selectColor;
    }
  }

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
      <TouchableOpacity id="status1" style={styles.button} onPress={() => { setStatus(1), handleSelect(1) }}>
        <Text style={styles.buttonText}>Not too well, ASAP needed</Text>
      </TouchableOpacity>
      <TouchableOpacity id="status2" style={styles.button} onPress={() => { setStatus(2), handleSelect(2) }}>
        <Text style={styles.buttonText}>All ok, the faster the better</Text>
      </TouchableOpacity>
      <TouchableOpacity id="status3" style={styles.button} onPress={() => { setStatus(3), handleSelect(3) }}>
        <Text style={styles.buttonText}>No rush</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitbuttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}