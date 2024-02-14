import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styleSheet';
import Login from './Login';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setSignedIn(true);
      // ...
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
    signedIn ? (
      <View style={styles.container}>
        <Text onPress={handleSignOut} style={[styles.text, { color: 'gray' }]}>Signed In, Press This to Sign Out</Text>
      </View>
    ) : (
      <>
        <View style={styles.container}>
          <Login />
        </View>
      </>
    ));

}