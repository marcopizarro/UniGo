import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { useState } from 'react';
import WaitingToBeMatched from './WaitingToBeMatched';
import { styles } from './StyleSheet';
import WaitingForDriverScreen from './WaitingForDriverScreen';
import DrivingHomeScreen from './DrivingHomeScreen';
import RideCompletedScreen from './RideCompletedScreen';
// statuses: waiting -> WaitingForDriver -> DriverIsWaiting -> InTransit -> DroppedOff

export default function RideInProgress({ route, navigation }) {
    const { pickup, destination, rideID } = route.params;
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("waiting");

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "rideRequests", rideID), (doc) => {
            console.log("Current data: ", doc.data());
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
                            <WaitingForDriverScreen pickup={pickup} destination={destination} />
                        </>
                    }
                    {data.status === "DriverIsWaiting" &&
                        <>
                            <Text>Driver is waiting for you</Text>
                        </>
                    }
                    {data.status === "InTransit" &&
                        <>
                            <DrivingHomeScreen pickup={pickup} destination={destination} />
                        </>
                    }
                    {data.status === "DroppedOff" &&
                        <>
                            <RideCompletedScreen />
                        </>
                    }
                </>
            }
        </View>
    );
};