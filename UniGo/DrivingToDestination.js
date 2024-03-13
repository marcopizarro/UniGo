import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { styles } from './StyleSheet'; // Adjust the path to your styles file
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import polyline from 'polyline';
import ProfileButton from './ProfileButton';
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function DrivingToDestination({ route, navigation }) {
    const { driverLoc, pickupLoc, destinationLoc, rideID, driverName, firstName, lastName, firstName, lastName } = route.params;
    const [coordinates, setCoordinates] = useState([]);
    const [driverPosition, setDriverPosition] = useState(driverLoc);
    const [destinationName, setDestinationName] = useState('');
    const [data, setData] = useState(null);
    const [ref, setRef] = useState(null);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "rideRequests", rideID), (doc) => {
            // console.log("Current data: ", doc.data());
            if (doc.exists()) {
                if (doc.data().status === "DroppedOff") {
                    unsub();
                }
                setData(doc.data());
                console.log("Adoc.data", doc.data().driverLocation)
                setRef(doc.ref);
            } else {
                console.log("No such document!");
            }
        });

        return () => unsub();
    }, []);


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


    function setIntervalWithPromise(target) {
        return async function (...args) {
            if (target.isRunning) return

            // if we are here, we can invoke our callback!
            target.isRunning = true
            await target(...args)
            target.isRunning = false
        }
    }

    // Update driver's position with current location and fetch updated route coordinates in intervals
    useEffect(() => {
        const intervalId = setInterval(setIntervalWithPromise(async () => {
            const { coords } = await Location.getCurrentPositionAsync({});
            // console.log("headtopuckip", coords.latitude, coords.longitude)
            await updateDoc(ref, {
                driverLocation: {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                },
            });
            setDriverPosition({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
            console.log("Asent")
            console.log("AdriverLoc", coords.latitude, coords.longitude)
            // send coordinates to firebase

        }), 5000); // Update the position every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff' }}>
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
            <View style={styles.overlayContainer}>
                <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 25, marginTop: -20, textAlign: 'left' }}>{firstName} {lastName}</Text>

                <Text style={{ color: '#167DEB', fontSize: 17, fontWeight: 'bold' }}> Drop off at: </Text>
                <Text style={{ color: '#167DEB', fontSize: 15, marginLeft: 5, marginBottom: 10}}> {destinationName.name} </Text>

                <TouchableOpacity
                    style={styles.endButton}
                    onPress={async () => {
                        await updateDoc(ref, {
                            status: "DroppedOff",
                        });
                        navigation.navigate('RideCompleteDriver');
                    }}
                >
                    <Text style={styles.submitButtonText}>End Trip</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


