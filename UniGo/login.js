import React, { useState } from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import { app, auth, db } from './firebaseConfig';
import { styles } from './StyleSheet';
import { Image } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    console.log('Login credentials', { email, password });
    // TODO check that email and password are valid
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in', errorCode, errorMessage);
      });
  };

  const handleSignUp = () => {
    console.log('Sign up credentials', { email, password });
    // TODO check that email and password are valid
    if (!email.includes('@')) {
      console.error('Invalid email');
      setError('Please enter a valid email address');
      return;
    }
    if (!email.includes('stanford.edu')) {
      console.error('Invalid email');
      setError('Please use a Stanford email address');
      return;
    }
    if (password.length < 6) {
      console.error('Password too short');
      setError('Password must be at least 6 characters');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up', user);
        try {
          const docRef = setDoc(doc(db, "users", auth.currentUser.uid), {
            email: email,
            name: email.split('@')[0],
          });
        }
        catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing up', errorCode, errorMessage);
      });
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Image
        source={require('./assets/logo.png')} // Make sure to replace './path/to/your/logo.png' with the actual path to your logo image
        style={{ width: 300, height: 200, marginBottom: 30 }} // Adjust the size of your logo as needed
        resizeMode="contain"

      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable style={styles.submitButton} onPress={handleSignUp}>
        <Text style={styles.submitButtonText}>Sign Up</Text>
      </Pressable>
      <Text onPress={handleForgotPassword} style={[styles.text, { color: 'gray' }]}>Forgot your password?</Text>
      {error != null &&
        <Text style={[styles.text, { color: 'red' }]}>{error}</Text>
      }

    </View >
  );
}
