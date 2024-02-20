import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './styleSheet';


export default function DriverArrives() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onUserLocationChange = (e) => {
    console.log(e.nativeEvent.coordinate.latitude);
    console.log(e.nativeEvent.coordinate.longitude);
    setLocation(e.nativeEvent.coordinate);
  };
  
  useEffect(() => {
    const getPermissions = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  if (location !== null) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType="mutedStandard"
          initialRegion={{latitude: 37.42753514520058, //need to pull driver location
                          latitudeDelta: .01, //should make this variable with destination and origin locations being determining factors
                          longitude: -122.16199162706553,
                          longitudeDelta: .01 //should make this variable with destination and origin locations being determining factors
                        }}
          showsUserLocation='true'
          onUserLocationChange={onUserLocationChange}
        >
          <Marker
            coordinate={{
              latitude: 37.42994872713819,
              longitude: -122.16937618578491
            }}
            title="Destination"
          />
          <Marker
            //link for icon attribution
            //<a href="https://www.flaticon.com/free-icons/car" title="car icons">Car icons created by Freepik - Flaticon</a>
            coordinate={{
              latitude: 37.42753514520058, //need to pull driver location
              longitude: -122.16199162706553
            }}
            title="Driver"
          >
            <Image 
              source={require('./assets/sedan.png')}
              style={styles.sedanIcon}
            />
          </Marker>
        </MapView>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cancel Request</Text>
        </TouchableOpacity>
      </View>
    );
  }
}