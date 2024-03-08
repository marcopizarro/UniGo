import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline} from 'react-native-maps';
import polyline from 'polyline';
import ProfileButton from './ProfileButton';

export default function HeadToPickup({ route, navigation }) {
    const { driverLoc, pickupLoc, destinationLoc, destinationName } = route.params;
    const [coordinates, setCoordinates] = useState([]);
    const [driverPosition, setDriverPosition] = useState(driverLoc);

    // Function to fetch route coordinates
    const fetchRouteCoordinates = async () => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${driverPosition.latitude},${driverPosition.longitude}&destination=${pickupLoc.latitude},${pickupLoc.longitude}&key=AIzaSyDptYEg4S4YjUGP6qyj5pv1pV8ZPW2QaDY`
        );
        const data = await response.json();
        const routeCoordinates = data.routes[0].overview_polyline.points;
        const decodedRouteCoordinates = polyline.decode(routeCoordinates);

        const latLngCoordinates = decodedRouteCoordinates.map(coordinate => ({
            latitude: coordinate[0],
            longitude: coordinate[1],
        }));

        setCoordinates(latLngCoordinates);
    };

    // Fetch route coordinates and update driver's position when component mounts
    useEffect(() => {
        fetchRouteCoordinates();
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
                        latitude: driverPosition.latitude,
                        longitude: driverPosition.longitude,
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
                        latitude: pickupLoc.latitude,
                        longitude: pickupLoc.longitude,
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

            <View style={styles.headToPickupContainer}>
                <TouchableOpacity
                    style={styles.acceptRidebutton}
                    onPress={() => {
                        navigation.navigate('HeadToPickup', {
                            driverLoc: driverLoc,
                            pickupLoc: pickupLoc,
                            destinationLoc: destinationLoc,
                        });
                    }}
                >
                    <Text style={styles.submitButtonText}>Arrived</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declinebutton} onPress={() => navigation.navigate('WelcomeScreenDriver')}>
                    <Text style={styles.submitButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.startTripContainer}>
                <TouchableOpacity
                    style={styles.startTripbutton}
                    onPress={() => {
                        navigation.navigate('DrivingToDestination', {
                            driverLoc: driverLoc,
                            pickupLoc: pickupLoc,
                            destinationLoc: destinationLoc,
                        });
                    }}
                >
                    <Text style={styles.submitButtonText}>Start Trip</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


