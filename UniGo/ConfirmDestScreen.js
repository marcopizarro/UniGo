import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
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
    setLocation(currentLocation.coords);
    };
    getPermissions();
  }, []);

  if (location !== null) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType="mutedStandard"
          //initial region will center on destination marker
          initialRegion={{latitude: 37.42994872713819, //must get latitude and longitude of destination from previous screens
                          latitudeDelta: .005, //should use fit to coordinates with destination and user location
                          longitude: -122.16937618578491,
                          longitudeDelta: .005
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
        </MapView>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirm destination</Text>
        </TouchableOpacity>
      </View>
    );
  }
}