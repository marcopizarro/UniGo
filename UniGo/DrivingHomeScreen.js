import React, { useState, useEffect } from 'react';
import { Text, View, Image, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './StyleSheet'
import { TouchableOpacity } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { db } from "./firebaseConfig";
import { collection, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";


const GOOGLE_PLACES_API_KEY = 'AIzaSyDptYEg4S4YjUGP6qyj5pv1pV8ZPW2QaDY';

export default function DrivingHomeScreen({ pickup, destination, driverLocation, rideID }) {
  const [location, setLocation] = useState({latitude: pickup.latitude, longitude: pickup.longitude});
  const [data, setData] = useState([]);
  const [driloc, setDriloc] = useState(null);

  const onUserLocationChange = (e) => {
    setLocation(e.nativeEvent.coordinate);
  };

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
      <MapView
        style={styles.map}
        mapType="mutedStandard"
        initialRegion={{
          latitude: driverLocation.latitude, //need to pull driver location
          latitudeDelta: .01, //should make this a function of origin and destination locations
          longitude: driverLocation.longitude, //need to pull driver location
          longitudeDelta: .01 //should make this a function of origin and destination locations
        }}
        showsUserLocation={false}
        onUserLocationChange={onUserLocationChange}
      >
        {pickup && destination &&<MapViewDirections
        origin={pickup}
        destination={destination}
        apikey={GOOGLE_PLACES_API_KEY}
        strokeColor='#6644ff'
        strokeWidth={5}>
        </MapViewDirections>}
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude
          }}
          title="Destination"
        />
        {driloc &&
        <Marker
          //link for icon attribution
          //<a href="https://www.flaticon.com/free-icons/car" title="car icons">Car icons created by Freepik - Flaticon</a>
          coordinate={{
            latitude: driloc.latitude, //need to pull driver location, its okay to use phone location instread bc they will be in same place -marco
            longitude: driloc.longitude
          }}
          title="Driver"
        >
          <Image
            //not sure how to replace blue user marker with image of car
            source={require('./assets/sedan.png')}
            style={styles.sedanIcon}
          />
        </Marker>
}
      </MapView>
      <Text>Your driver is taking you to your destination. </Text>
    </View>
  );
}