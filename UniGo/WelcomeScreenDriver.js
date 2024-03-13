import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { Button } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import ProfileButton from './ProfileButton';
import { getDocs, query, where, orderBy, limit, updateDoc, onSnapshot } from "firebase/firestore";

export default function WelcomeScreenDriver({ navigation }) {

  const [driverLoc, setDriverLoc] = useState('');
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [rideID, setRideID] = useState(0);
  const [userID, setUserID] = useState();
  const [noRider, setNoRider] = useState(true);
  const driverName = "driver1"; // TODO pull from db


  useEffect(() => {
    getCurrentLocation();
    claimRider();
  }, []);

  async function claimRider() {
    console.log("Getting rider");
    //TODO make this constantly update
    const q = query(collection(db, "rideRequests"), where("status", "==", "waiting"), orderBy("time", "asc"), limit(1));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No rider found");
        setNoRider(true);
        return;
      }
      querySnapshot.forEach(async (doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log("Rider found");
        setRideID(doc.id);
        setPickup(doc.data().pickupLoc);
        setDestination(doc.data().destinationLoc);
        setNoRider(false);

        setUserID(doc.data().user)
      }
        return () => unsubscribe();
    });

  }


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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff' }}>
      {
        !(driverLoc && driverName || (rideID && destination && pickup && driverLoc && driverName)) ?
          <ActivityIndicator size="large" color="#95A2F1" />
          : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#167DEB', fontSize: 40, fontWeight: 'bold', marginBottom: 80 }}>UniGo Driver</Text>
              {noRider ? <Text>No Riders to Pick Up</Text> : (
                <TouchableOpacity style={styles.welcomeDriverbutton} onPress={async () => {
                  if (driverLoc && driverName) {
                    navigation.navigate('AcceptRide', {
                      driverLoc: driverLoc, pickupLoc: pickup, destinationLoc: destination, rideID, driverName, userID
                    });
                  } else {
                    alert('Allow access to location');
                  }
                }}>
                  <Text style={styles.buttonText}>Get A New Rider</Text>
                </TouchableOpacity>
              )}
            </View>
          )
      }
    </View >
  );
}

