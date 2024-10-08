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
import ChatScreen from './ChatScreen';

export default function HeadToPickup({ route, navigation }) {
    const { driverLoc, pickupLoc, destinationLoc, destinationName, rideID, driverName, firstName, lastName, number } = route.params;
    const [coordinates, setCoordinates] = useState([]);
    const [driverPosition, setDriverPosition] = useState(driverLoc);
    const [data, setData] = useState(null);
    const [ref, setRef] = useState(null);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "rideRequests", rideID), (doc) => {
            // console.log("Current data: ", doc.data());
            if (doc.exists()) {
                if (doc.data().status === "DroppedOff") {
                    unsub();
                }
                console.log("doc.data", doc.data().driverLocation)
                setData(doc.data());
                setRef(doc.ref);
            } else {
                console.log("No such document!");
            }
        });

        return () => unsub();
    }, []);

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
            console.log("sent")
            console.log("driverLoc", coords.latitude, coords.longitude)
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


            {data &&(
            <View style={styles.overlayContainer}>
            {/* Name and Number Display */}
            <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}>
                {firstName} {lastName}
            </Text>
            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginBottom: 30 }}>
                {number}
            </Text>
            
            {/* Conditional Rendering based on data.status */}
            {data.status !== "DriverIsWaiting" && (
                <TouchableOpacity
                style={styles.arrivedbutton}
                onPress={async () => {
                    await updateDoc(ref, {
                    status: "DriverIsWaiting",
                    });
                }}
                >
                <Text style={styles.buttonText}>I've arrived</Text>
                </TouchableOpacity>
            )}
            
            {data.status === "DriverIsWaiting" && (
                <>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity 
                    style={styles.cancelbutton} 
                    onPress={async () => {
                        await updateDoc(ref, {
                        status: "RiderNotHere",
                        });
                        navigation.navigate('WelcomeScreenDriver');
                    }}
                    >
                    <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => navigation.navigate("ChatScreen", { rideID: rideID})}
                    style={styles.chatButton}
                    >
                    <Image
                        source={require('./assets/bw_chat.png')} 
                        style={{width: 35, height: 20, marginRight: 10}}
                    />
                    <Text style={styles.buttonText}>Chat</Text>
                    </TouchableOpacity>
                </View>

                    <TouchableOpacity
                    style={styles.startTripbutton}
                    onPress={async () => {
                        await updateDoc(ref, {
                        status: "InTransit",
                        });
                        navigation.navigate('DrivingToDestination', {
                        driverLoc,
                        pickupLoc,
                        destinationLoc,
                        rideID,
                        driverName,
                        firstName,
                        lastName,
                        });
                    }}
                    >
                    <Text style={styles.startTripButtonText}>Start Trip</Text>
                    </TouchableOpacity>
                </>
            )}
            </View>
        )
        }

        </View>
    );
}


