import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from './firebaseConfig';
import { styles } from './styleSheet'; 


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
      <Text style={styles.title}>Welcome to UniGo</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text onPress={handleForgotPassword} style={[styles.text, { color: 'gray' }]}>Forgot your password?</Text>
      {error != null &&
        <Text style={[styles.text, { color: 'red' }]}>{error}</Text>
      }

    </View >
  );
}
