import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './StyleSheet';


export default function WaitingForDriverScreen({route, navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { pickup, destination } = route.params; 

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

  if (route !== null) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType="mutedStandard"
          initialRegion={{latitude: pickup.latitude, //need to pull driver location
                          latitudeDelta: .01, //should make this variable with destination and origin locations being determining factors
                          longitude: pickup.longitude,
                          longitudeDelta: .01 //should make this variable with destination and origin locations being determining factors
                        }}
          showsUserLocation='true'
          onUserLocationChange={onUserLocationChange}
        >
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DrivingHomeScreen', { pickup : pickup, destination: destination })}
          >
          <Text style={styles.buttonText}>Driver arrives</Text>
        </TouchableOpacity>
      </View>
    );
  }
}