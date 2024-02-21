// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyCHa90LWzpghFxYWsWUlyGsjBgCAcjiK74",
    authDomain: "unigo-8cc53.firebaseapp.com",
    projectId: "unigo-8cc53",
    storageBucket: "unigo-8cc53.appspot.com",
    messagingSenderId: "846882008717",
    appId: "1:846882008717:web:167013694e811d46a97cc4",
    measurementId: "G-3DNPH1D7T7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

