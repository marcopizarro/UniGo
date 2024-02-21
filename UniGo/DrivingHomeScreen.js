import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './StyleSheet'


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
                          latitudeDelta: .01, //should make this a function of origin and destination locations
                          longitude: -122.16199162706553, //need to pull driver location
                          longitudeDelta: .01 //should make this a function of origin and destination locations
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
              latitude: location.latitude , //need to pull driver location
              longitude: location.longitude
            }}
            title="Driver"
          >
            <Image 
              //not sure how to replace blue user marker with image of car
              source={require('./assets/sedan.png')}
              style={styles.sedanIcon}
            />
          </Marker>
        </MapView>
        <Text>Your driver is taking you to your destination.</Text>
      </View>
    );
  }
}