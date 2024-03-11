import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Login from './Login';
import { styles } from './StyleSheet';
import WaitingToBeMatched from './WaitingToBeMatched';
import AreYouOk from './AreYouOk';
import PickupScreen from './PickupScreen';
import DestinationScreen from './DestinationScreen';
import WelcomeScreen from './WelcomeScreen';
import ConfirmDestScreen from './ConfirmDestScreen';
import DrivingHomeScreen from './DrivingHomeScreen';
import MatchApprovedScreen from './MatchApprovedScreen';
import WaitingForDriverScreen from './WaitingForDriverScreen';
import RideCompletedScreen from './RideCompletedScreen';
import LocationsScreen from './LocationsScreen';
import WelcomeScreenDriver from './WelcomeScreenDriver';
import AcceptRide from './AcceptRide'
import HeadToPickup from './HeadToPickup'
import RideCompleteDriver from './RideCompleteDriver'
import DrivingToDestination from './DrivingToDestination'
import Profile from './Profile'
import ProfileButton from './ProfileButton'
import RideInProgress from './RideInProgress';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from './Loading';
import { Image } from 'react-native';
import Constants from 'expo-constants';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

import 'expo-dev-menu';


export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(0);
  const Stack = createNativeStackNavigator();


  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // <Stack.Screen name="PickupScreen" component={PickupScreen} />
      // <Stack.Screen name="DestinationScreen" component={DestinationScreen} /> 
      const uid = user.uid;
      const usersDocRef = doc(db, "users", uid);
      try {
        const docSnap = await getDoc(usersDocRef);
        if (docSnap.exists()) {
          const driverOrPass = docSnap.data().driver;
          setStatus(driverOrPass == 1 ? 1 : 0);
          setLoading(false);
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
      setSignedIn(true);
      setLoading(false);
    } else {
      setSignedIn(false);
      setLoading(false);
    }
  });

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setSignedIn(false);
    }).catch((error) => {
      // An error happened.
    });
  }

  return (

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerBackTitleVisible: false,
              headerTitle: () => (
                <Image
                  source={require('./assets/logo.png')}
                  style={{ width: 100, height: 50, alignSelf: 'center' }}
                  resizeMode="contain"
                />
              ),
              headerTitleAlign: 'center', // This will center the title text
              headerStyle: {
                backgroundColor: '#95A2F1',
                height: 100, // Adjusted for a reasonable height
              },
              headerTintColor: '#fff',
              headerTitleContainerStyle: {
                justifyContent: 'center', // Adjust this as necessary to align the title content
                alignItems: 'center', // Center the title content horizontally
                height: '100%', // Ensure the container takes full height of the larger header
              },
              // Add profile button on the right side of header
              headerRight: ({ navigation }) => <ProfileButton navigation={navigation} handleSignOut={handleSignOut} />,

            }}
          >
            {loading ? <Stack.Screen name="Loading" component={Loading} /> : (
              <>
                {signedIn ? (
                  <>
                    {status === 0 ? (
                      <>
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                        <Stack.Screen name="LocationsScreen" component={LocationsScreen} />
                        <Stack.Screen name="AreYouOk" component={AreYouOk} />
                        <Stack.Screen name="RideInProgress" component={RideInProgress} />
                        <Stack.Screen name="Profile">
                          {(props) => <Profile handleSignOut={handleSignOut} {...props} />}
                        </Stack.Screen>
                      </>
                    ) : (
                      <>
                        <Stack.Screen name="WelcomeScreenDriver" component={WelcomeScreenDriver} />
                        <Stack.Screen name="AcceptRide" component={AcceptRide} />
                        <Stack.Screen name="HeadToPickup" component={HeadToPickup} />
                        <Stack.Screen name="DrivingToDestination" component={DrivingToDestination} />
                        <Stack.Screen name="RideCompleteDriver" component={RideCompleteDriver} />
                        <Stack.Screen name="Profile">
                          {(props) => <Profile handleSignOut={handleSignOut} {...props} />}
                        </Stack.Screen>
                      </>
                    )}
                  </>
                ) : (
                  <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                )}
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>

  );
}