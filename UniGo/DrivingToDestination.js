import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline} from 'react-native-maps';
import polyline from 'polyline';
import ProfileButton from './ProfileButton';

export default function DrivingToDestination({ route, navigation }) {
    const { driverLoc, pickupLoc, destinationLoc } = route.params;
    const [coordinates, setCoordinates] = useState([]);
    const [driverPosition, setDriverPosition] = useState(driverLoc);
    const [destinationName, setDestinationName] = useState('');


    const getPlaceName = async (destinationLatitude, destinationLongitude) => {
        console.log(destinationLatitude);
        console.log(destinationLongitude);
        try {
          const location = await Location.reverseGeocodeAsync({
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          });
      
          // The location object contains the address components, including the name
          let str1 = location[0].name;
          let str2 = location[0].street;
          let result = str1 + " " + str2;
          console.log(result);

          setDestinationName({
            name: result,
          });
          
        } catch (error) {
          console.error(error);
        }
    };


    // Function to fetch route coordinates
    const fetchRouteCoordinates = async () => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${driverLoc.latitude},${driverLoc.longitude}&destination=${destinationLoc.latitude},${destinationLoc.longitude}&key=AIzaSyDptYEg4S4YjUGP6qyj5pv1pV8ZPW2QaDY`
        );
        const data = await response.json();
        const routeCoordinates = data.routes[0].overview_polyline.points;
        const decodedRouteCoordinates = polyline.decode(routeCoordinates);

        const latLngCoordinates = decodedRouteCoordinates.map(coordinate => ({
            latitude: coordinate[0],
            longitude: coordinate[1],
        }));

        setCoordinates(latLngCoordinates);
        // console.log("DecodedCoords: ", latLngCoordinates);
    };

    // Fetch route coordinates when component mounts
    useEffect(() => {
        fetchRouteCoordinates();
        getPlaceName(destinationLoc.latitude, destinationLoc.longitude);
    }, []);


    // Update driver's position with current location and fetch updated route coordinates in intervals
    useEffect(() => {
        const intervalId = setInterval(async () => {
            const { coords } = await Location.getCurrentPositionAsync({});
            setDriverPosition({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
        }, 5000); // Update the position every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MapView
                style={styles.mapDriver}
                mapType="mutedStandard"
                initialRegion={{
                    latitude: driverLoc.latitude,
                    latitudeDelta: 0.01,
                    longitude: driverLoc.longitude,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: driverLoc.latitude,
                        longitude: driverLoc.longitude,
                    }}
                    title="Driver"
                >
                    <Image
                        source={require('./assets/sedan.png')}
                        style={styles.sedanIcon}
                    />
                </Marker>
                <Marker
                    coordinate={{
                        latitude: destinationLoc.latitude,
                        longitude: destinationLoc.longitude,
                    }}
                    title="Passenger"
                />
                {coordinates.length > 0 && (
                    <Polyline
                        coordinates={coordinates}
                        strokeWidth={4}
                        strokeColor="#00f"
                    />
                )}
            </MapView>

            {/* ProfileButton component added to the header
            <ProfileButton navigation={navigation} /> */}

            <Text style={{ color: '#736CC1', fontSize: 15, fontWeight: 'bold', marginBottom: 50, marginTop: -20 }}>Drop off at {destinationName.name}</Text>

            <TouchableOpacity
                style={styles.welcomeDriverbutton}
                onPress={() => {
                    navigation.navigate('RideCompleteDriver', {
                        driverLoc: driverLoc,
                        pickupLoc: pickupLoc,
                        destinationLoc: destinationLoc,
                    });
                }}
            >
                <Text style={styles.submitButtonText}>End Trip</Text>
            </TouchableOpacity>
        </View>
    );
}


