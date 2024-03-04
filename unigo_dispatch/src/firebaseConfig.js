// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgEi7MUxxSTA4Xd1-60kDQS0DDz7eqBiQ",
    authDomain: "unigo-8cc53.firebaseapp.com",
    projectId: "unigo-8cc53",
    storageBucket: "unigo-8cc53.appspot.com",
    messagingSenderId: "846882008717",
    appId: "1:846882008717:web:cf6f02e8185058eca97cc4",
    measurementId: "G-NHQVSRYTZM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

