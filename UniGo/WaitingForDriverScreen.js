import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './StyleSheet';
import MapViewDirections from 'react-native-maps-directions';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const GOOGLE_PLACES_API_KEY = 'AIzaSyDptYEg4S4YjUGP6qyj5pv1pV8ZPW2QaDY';

export default function WaitingForDriverScreen({ uid, pickup, destination, driverLocation, rideID }) {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [driloc, setDriloc] = useState(null);

  const onUserLocationChange = (e) => {
    setLocation(e.nativeEvent.coordinate);
  };

  const pullDriverDoc = async () => {
    console.log(uid);
    const usersDocRef = doc(db, "users", uid);
    try {
      const docSnap = await getDoc(usersDocRef);
      if (docSnap.exists()) {
        console.log(data);
        setData(docSnap.data());
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  };

  useEffect(() => {
    pullDriverDoc();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const usersDocRef = doc(db, "rideRequests", rideID);
      try {
        const docSnap = await getDoc(usersDocRef);
        if (docSnap.exists()) {
          console.log("passsside", docSnap.data().driverLocation);
          setDriloc(docSnap.data().driverLocation);
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    }, 5000); // Update the position every 5 seconds

    return () => clearInterval(intervalId);
}, []);
  
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginTop: 5, marginBottom: 5, textAlign: 'center' }}>Your driver is on the way!</Text>
        {driverLocation && <MapView
          style={styles.map}
          mapType="mutedStandard"
          initialRegion={{
            latitude: pickup.latitude,
            latitudeDelta: .01,
            longitude: pickup.longitude,
            longitudeDelta: .01
          }}
          showsUserLocation='true'
          onUserLocationChange={onUserLocationChange}
        >
          {pickup && driverLocation &&<MapViewDirections
          origin={pickup}
          destination={driloc}
          apikey={GOOGLE_PLACES_API_KEY}
          strokeColor='#6644ff'
          strokeWidth={5}>
          </MapViewDirections>}
          {driloc && <Marker
              coordinate={{
                  latitude: driloc.latitude,
                  longitude: driloc.longitude,
              }}
              title="Driver"
            >
                <Image
                    source={require('./assets/sedan.png')}
                    style={styles.sedanIcon}
                />
            </Marker>}
            <Marker
                coordinate={{
                    latitude: pickup.latitude,
                    longitude: pickup.longitude,
                }}
                title="Pickup"
            />
            
        </MapView>}
        {data && <View style={styles.overlayContainer}>
          <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold', marginTop: 10, marginBottom: 10, textAlign: 'left' }}> {data.firstName + " " + data.lastName}</Text>
          <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginBottom: 30 }}> {data.phoneNumber}</Text>
          <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Car Type:</Text>
          <Text style={{ color: 'black', fontSize: 13, marginBottom: 15 }}>{data.carType}</Text>
          <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>License Plate:</Text>
          <Text style={{ color: 'black', fontSize: 13, marginBottom: 15 }}>{data.licensePlate}</Text>
        </View>}
      </View>
    );
}