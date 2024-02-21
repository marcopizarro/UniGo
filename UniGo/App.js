import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Login from './login';
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import 'expo-dev-menu';


export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [status, setStatus] = useState(0);
  const Stack = createNativeStackNavigator();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setSignedIn(true);
    } else {
      setSignedIn(false);
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
          headerTitle: () => (
            <Image
              source={require('./assets/logo.png')} 
              style={{ width: 200, height: 100, align: 'center' }} 
              resizeMode= "contain"
            />
          ),
          headerTitleAlign: 'center', // This will center the title text
          headerStyle: {
            backgroundColor: '#95A2F1',
            height: 400, // Adjusted for a reasonable height
          },
          headerTintColor: '#fff',
        
        }}
      >
        {signedIn ? (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="PickupScreen" component={PickupScreen} />
            <Stack.Screen name="DestinationScreen" component={DestinationScreen} />
            <Stack.Screen name="AreYouOk" component={AreYouOk} />
            <Stack.Screen name="WaitingToBeMatched" component={WaitingToBeMatched} />
            <Stack.Screen name="MatchApprovedScreen" component={MatchApprovedScreen} />
            <Stack.Screen name="WaitingForDriverScreen" component={WaitingForDriverScreen} />
            <Stack.Screen name="DrivingHomeScreen" component={DrivingHomeScreen} />
            <Stack.Screen name="RideCompletedScreen" component={RideCompletedScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}