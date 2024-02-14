import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Login from './Login';
import { styles } from './StyleSheet';
import WaitingMatchDriverScreen from './WaitingMatchDriverScreen';
import PickupScreen from './PickupScreen';
import DestinationScreen from './DestinationScreen';
import WelcomeScreen from './WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {signedIn ? (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="PickupScreen" component={PickupScreen} />
            <Stack.Screen name="DestinationScreen" component={DestinationScreen} />
            <Stack.Screen name="WaitingMatchDriverScreen" component={WaitingMatchDriverScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );


}