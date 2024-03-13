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




export default function AcceptRide({ route, navigation }) {
    const { driverLoc, pickupLoc, destinationLoc, rideID, driverName, userID } = route.params;
    const [coordinates, setCoordinates] = useState([]);
    const [pickupName, setPickupName] = useState('');
    const [destinationName, setDestinationName] = useState('');
    const [data, setData] = useState(null);
    const [ref, setRef] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [number, setNumber] = useState('');

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "rideRequests", rideID), (doc) => {
            // console.log("Current data: ", doc.data());
            if (doc.exists()) {
                if (doc.data().status === "DroppedOff") {
                    unsub();
                }
                setData(doc.data());
                setRef(doc.ref);
            } else {
                console.log("No such document!");
            }
        });

       

        return () => unsub();
    }, []);

    // const getInfo = asynch (rideID) => {

    // }

    const getPlaceName = async (pickupLatitude, pickupLongitude, destinationLatitude, destinationLongitude) => {
        console.log(pickupLatitude);
        console.log(pickupLongitude);
        console.log(destinationLatitude);
        console.log(destinationLongitude);
        try {
            const location = await Location.reverseGeocodeAsync({
                latitude: pickupLatitude,
                longitude: pickupLongitude,
            });

            // The location object contains the address components, including the name
            let str1 = location[0].name;
            let str2 = location[0].street;
            let result = str1 + " " + str2;
            console.log(result);

            setPickupName({
                name: result,
            });

        } catch (error) {
            console.error(error);
        }

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


    const userInfo = async () => {
        console.log('USER ID')
        console.log(userID)
        const usersDocRef = doc(db, "users", userID);
        console.log('USER ID')
        try {
        const docSnap = await getDoc(usersDocRef);
        if (docSnap.exists()) {
            // Retrieve the data from the document
            const userData = docSnap.data();
            // Now you can work with userData, it contains the document data
            console.log('USER DATA!!')
            console.log(userData);
            console.log('DATA ABOVE!!!!')
            setFirstName(userData.firstName)
            setLastName(userData.lastName)
            setNumber(userData.phoneNumber)
        } else {
            console.log('Document does not exist');
        }
        } catch (error) {
        console.error('Error getting document:', error);
        }

    }



    // Function to fetch route coordinates
    const fetchRouteCoordinates = async () => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${driverLoc.latitude},${driverLoc.longitude}&destination=${pickupLoc.latitude},${pickupLoc.longitude}&key=AIzaSyDptYEg4S4YjUGP6qyj5pv1pV8ZPW2QaDY`
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
        getPlaceName(pickupLoc.latitude, pickupLoc.longitude, destinationLoc.latitude, destinationLoc.longitude);
        userInfo();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>

            <MapView
                style={styles.mapAcceptRide}
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
            <View style={styles.overlayContainer}>

                {/* ProfileButton component added to the header
                <ProfileButton navigation={navigation} /> */}
                <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginTop: 10, marginBottom: 10, textAlign: 'left' }}>{firstName} {lastName}</Text>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginBottom: 30}}> {number}</Text>

                <Text style={{ color: '#167DEB', fontSize: 17, fontWeight: 'bold' }}> Pick up at:  </Text>
                <Text style={{ color: '#167DEB', fontSize: 15,  marginBottom: 15}}> {pickupName.name} </Text>

                <Text style={{ color: '#167DEB', fontSize: 17, fontWeight: 'bold' }}> Drop off at: </Text>
                <Text style={{ color: '#167DEB', fontSize: 15, marginLeft: 5, marginBottom: 100}}> {destinationName.name} </Text>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.acceptRidebutton}
                        onPress={async () => {
                            if (data.status !== "waiting") {
                                navigation.goBack()
                            }
                            await updateDoc(ref, {
                                status: "WaitingForDriver",
                                driver: driverName
                            });
                            navigation.navigate('HeadToPickup', {
                                driverLoc: driverLoc,
                                pickupLoc: pickupLoc,
                                destinationLoc: destinationLoc,
                                destinationName: destinationName,
                                rideID: rideID,
                                driverName: driverName,
                                firstName,
                                lastName,
                                number
                            });
                        }}
                    >
                        <Text style={styles.submitButtonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declinebutton} onPress={() => navigation.navigate('WelcomeScreenDriver')}>
                        <Text style={styles.submitButtonText}>Decline</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}

