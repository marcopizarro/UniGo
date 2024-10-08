import React, { useRef, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const GOOGLE_PLACES_API_KEY = 'AIzaSyDptYEg4S4YjUGP6qyj5pv1pV8ZPW2QaDY'; // never save your real api key in a snack!
import { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { Platform } from 'react-native';


/*Stanford's Initial position*/
const INITIAL_POSITION = {
  latitude: 37.4277,
  longitude: -122.1701,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};


export default function LocationsScreen() {
  const navigation = useNavigation();
  /*Necessary constants*/
  const [location, setLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const mapRef = useRef(null);
  const [passengers, setPassengers] = useState('1'); // Default to 1 passenger
  const handlePickup = () => {
    console.log('Pickup', { pickup });
  };
  const handleDropoff = () => {
    console.log('Dropoff', { dropoff });
  };

  

  /*Obtain user's current location*/
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const currentLocation = {
        description: "Current location",
        geometry: { location: { lat: location.coords.latitude, lng: location.coords.longitude } }
      };
      setCurrentLocation(currentLocation);
    })();
  }, []);

    /*Padding stuff for the zoom in to final route*/
    const edgePaddingValue = 100;
    const edgePadding = {
      top: edgePaddingValue,
      right: edgePaddingValue,
      bottom: edgePaddingValue,
      left: edgePaddingValue
    };

  /*After setting the pickup and/or dropoff location move to the location individually.*/
  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };
  
  /*After selecting the pickup location, set the 
  pickup coordinates and move to the location*/
  const onPlaceSelectedPickup = (
    details
  ) => {
    const position = {
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
    };

    //Set pickup location passed
    setPickup(position);

    //if no dropoff location has been selected move to the individual 
    //pickup location
    if (dropoff === ''){
      moveTo(position);
    }

    //else if both pick up and dropoff locations have been selected 
    //trace the route
    if (position && dropoff) {

      //math calculations used to fit the route in the screen
      const maxLatitude = Math.max(dropoff.latitude, position.latitude);
      const minLatitude = Math.min(dropoff.latitude, position.latitude);
      const maxLongitude = Math.max(dropoff.longitude, position.longitude);
      const minLongitude = Math.min(dropoff.longitude, position.longitude);

      //fit the screen sccordingly with the given coordinates
      mapRef.current?.fitToCoordinates([
        { latitude: maxLatitude, longitude: maxLongitude }, 
        { latitude: maxLatitude, longitude: minLongitude }, 
        { latitude: minLatitude, longitude: maxLongitude },
        { latitude: minLatitude, longitude: minLongitude }, 
      ], {edgePadding: edgePadding});
    }
    
  };

  /*After selecting the dropoff location, set the 
  dropoff coordinates and move to the location*/
  const onPlaceSelectedDropoff = (
    details
  ) => {
    const position = {
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
    };

    //set dropoff location
    setDropoff(position);

    //if no pickup location has been selected
    //move to the dropoff location
    if (pickup === ''){
      moveTo(position);
    }

    //else if both pickup and dropoff location have been
    //selected trace the path
    if (pickup && position) {
      
      //math used to fit the screen accordingly
      const maxLatitude = Math.max(pickup.latitude, position.latitude);
      const minLatitude = Math.min(pickup.latitude, position.latitude);
      const maxLongitude = Math.max(pickup.longitude, position.longitude);
      const minLongitude = Math.min(pickup.longitude, position.longitude);

      //fit to the screen accordingly given the coordinates
      mapRef.current?.fitToCoordinates([
        { latitude: maxLatitude, longitude: maxLongitude }, 
        { latitude: maxLatitude, longitude: minLongitude }, 
        { latitude: minLatitude, longitude: maxLongitude },
        { latitude: minLatitude, longitude: minLongitude }, 
      ], {edgePadding: edgePadding});
    }

  };


  /*Trace the route after the traceroute button is pressed and zoom accordingly
  to the final route */


  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        zoomEnabled={true}
      >
        {pickup && <Marker coordinate={pickup} pinColor='blue' title='Pickup Location' />}
        {dropoff && <Marker coordinate={dropoff} pinColor='red' title='Dropoff Location' />}

        {pickup && dropoff && <MapViewDirections
          origin={pickup}
          destination={dropoff}
          apikey={GOOGLE_PLACES_API_KEY}
          strokeColor='#6644ff'
          strokeWidth={5}>
        </MapViewDirections>}
      </MapView>

      {currentLocation ?
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder="Pickup Location"
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en', // language of the results
            }}
            fetchDetails
            onPress={(data, details = null) => onPlaceSelectedPickup(details)}
            predefinedPlaces={[currentLocation]}
          />
          <GooglePlacesAutocomplete
            placeholder="Drop off Location"
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en', // language of the results
            }}
            fetchDetails
            onPress={(data, details = null) => onPlaceSelectedDropoff(details)}
            
          />
          <RNPickerSelect
            onValueChange={(value) => setPassengers(value)}
            items={[
              { label: '1 passenger', value: '1' },
              { label: '2 passengers', value: '2' },
              { label: '3 passengers', value: '3' },
              { label: '4 passengers', value: '4' },
              { label: '5 passengers', value: '5' },
            ]}

            useNativeAndroidPickerStyle={false} // disable the native Android style
            placeholder={{
              label: 'Select Number of Passengers...',
              value: null,
            }}
            style={{
              inputIOS: {
                fontSize: 15,
                padding: 10,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 4,
                color: 'black',
                backgroundColor: 'white',
                marginTop: 5,
              },
              inputAndroid: {
                fontSize: 15,
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                color: 'black',
                backgroundColor: 'white',
                marginTop: 5,
              },
            }}
            
          />


          <TouchableOpacity style={styles.button} onPress={() => {
            if (pickup && dropoff) {
              handlePickup();
              navigation.navigate('AreYouOk', { pickup: pickup, destination: dropoff, passengers: passengers });
            } else {
              alert('Please specify pickup location, drop off location and number of passengers');
            }
          }}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

        </View>
        :
        <View style={styles.searchContainer}>
          <ActivityIndicator size="large" color="#95A2F1" />
        </View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,

  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  },
});