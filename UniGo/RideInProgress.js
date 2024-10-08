import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { useState } from 'react';
import WaitingToBeMatched from './WaitingToBeMatched';
import { styles } from './StyleSheet';
import WaitingForDriverScreen from './WaitingForDriverScreen';
import DrivingHomeScreen from './DrivingHomeScreen';
import RideCompletedScreen from './RideCompletedScreen';
import ChatScreen from './ChatScreen';
// statuses: waiting -> WaitingForDriver -> DriverIsWaiting -> InTransit -> DroppedOff

export default function RideInProgress({ route, navigation }) {
    const { pickup, destination, rideID } = route.params;
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("waiting");
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

    useEffect(() => {
        if (data && data.status === "DriverIsWaiting" && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            
            return () => clearTimeout(timer);
        }
    }, [data, timeLeft]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "rideRequests", rideID), (doc) => {
            // console.log("Current data: ", doc.data());
            if (doc.exists()) {
                if (doc.data().status === "DroppedOff") {
                    unsub();
                }
                setData(doc.data());
            } else {
                console.log("No such document!");
            }
        });

        return () => unsub();
    }, []);

    function sendToMainScreen() {
        navigation.reset({
            index: 0,
            routes: [{ name: 'WelcomeScreen' }],
        });
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {data &&
                <>
                    {data.status === "waiting" &&
                        <>
                            <WaitingToBeMatched pickup={pickup} destination={destination} />
                        </>
                    }
                    {data.status === "WaitingForDriver" &&
                        <>
                            <WaitingForDriverScreen uid={data.driver} pickup={pickup} destination={destination} driverLocation={data.driverLocation} rideID={rideID}/>
                        </>
                    }
                    {data.status === "DriverIsWaiting" &&
                        <>
                            <Text style={{ color: 'black',  fontWeight: '800', fontSize: 30, marginBottom: 30 }}>Driver is waiting for you!</Text>
                            <Text style={{ color: 'black',  fontWeight: '600', fontSize: 18, marginBottom: 30 }}>The driver will leave after 5 minutes</Text>
                            <Text style={{ color: '#003FFA',  fontWeight: '600', fontSize: 20, marginBottom: 30 }}>Time left: {formatTime(timeLeft)}</Text>
                          
                            <TouchableOpacity
                                    onPress={() => navigation.navigate("ChatScreen", { rideID: rideID})}
                                    style={styles.chatButton}
                        >
                        <Image
                            source={require('./assets/bw_chat.png')} 
                            style={{width: 35, height: 20, marginRight: 10}}
                            />
                        <Text style={styles.buttonText}>Text Driver</Text>
                        </TouchableOpacity>
                        
                        </>
                    }
                    {data.status === "InTransit" &&
                        <>
                            <DrivingHomeScreen pickup={pickup} destination={destination} driverLocation={data.driverLocation} rideID={rideID}/>
                        </>
                    }
                    {data.status === "DroppedOff" &&
                        <>
                            <RideCompletedScreen sendToMainScreen={sendToMainScreen} />
                        </>
                    }
                </>
            }
        </View>
    );
};