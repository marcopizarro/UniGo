import React, { useState } from 'react';
import { View, Text } from 'react-native';
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import AccountScreen from './AccountScreen'; // Import your AccountScreen component


import 'expo-dev-menu';


export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [status, setStatus] = useState(0);
  const Stack = createNativeStackNavigator();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // <Stack.Screen name="PickupScreen" component={PickupScreen} />
      // <Stack.Screen name="DestinationScreen" component={DestinationScreen} /> 
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
           screenOptions={({ navigation }) => ({
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: () => <Text style={{ fontSize: 25, fontWeight: '800', color: '#FFF' }}>UniGo</Text>,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#003FFA',
              height: 100,
            },
            headerTintColor: 'white',
            headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AccountScreen')}>
                <Image
                  source={require('./assets/account.png')} // Update the path to where your icon is located
                  style={{ width: 30, height: 30, marginRight: 10 }} // You can adjust the size and margin as needed
                />
              </TouchableOpacity>
            ),
          })}
  
        >
        {signedIn ? (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>

            <Stack.Screen name="LocationsScreen" component={LocationsScreen} />
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