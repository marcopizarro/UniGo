import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; 
import ProfileButton from './ProfileButton';

export default function WelcomeScreenDriver({ navigation }) {

    const [driverLoc, setDriverLoc] = useState('');
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    

    const rideRequestDocRef = doc(db, "rideRequests", "jYPYZ18wZEUtwHHCGSQ2"); // replace "rideRequestId" with the id of the document you want to access

    const getPickupLoc = async (rideRequestDocRef) => {
        const docSnap = await getDoc(rideRequestDocRef);
    
        if (docSnap.exists()) {
        const pickupLoc = docSnap.data().pickupLoc;
        const destinationLoc = docSnap.data().destinationLoc;
        console.log("pickupLoc: ", pickupLoc);
        console.log("destinationLoc: ", destinationLoc);
        // do something with the destinationLoc data
          if (pickupLoc) {
          setPickup({
              latitude: pickupLoc.latitude,
              longitude: pickupLoc.longitude,
            });
          }

          if (destinationLoc) {
            setDestination({
              latitude: destinationLoc.latitude,
              longitude: destinationLoc.longitude,
            });
          }
        } else {
        console.log("No such document!");
        }
    };


    const handleLoc = () => { 
        console.log('DriverLoc', { driverLoc }); 
    }; 


    const getCurrentLocation = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          console.log('Permission to access location was denied');
          return;
        }
        const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
        setDriverLoc({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#736CC1', fontSize: 40, fontWeight: 'bold', marginBottom: 80 }}>Welcome</Text>
              <TouchableOpacity style={styles.welcomeDriverbutton} onPress={() => {
                getCurrentLocation();
                getPickupLoc(rideRequestDocRef);
                handleLoc();
                if (driverLoc) {
                  navigation.navigate('AcceptRide', {
                    driverLoc: driverLoc, pickupLoc: pickup, destinationLoc: destination
                  });
                } else {
                  alert('Allow access to location');
                }
              }}>
                <Text style={styles.submitButtonText}>Start</Text>
              </TouchableOpacity>

              {/* ProfileButton component added to the header
              <ProfileButton navigation={navigation} /> */}
              
              <TouchableOpacity style={styles.welcomeDriverbutton} onPress={() => navigation.navigate('WelcomeScreenDriver')}>
                <Text style={styles.submitButtonText}>End</Text>
              </TouchableOpacity>
    </View>
  );
}

