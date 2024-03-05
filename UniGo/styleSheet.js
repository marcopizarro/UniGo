// AppStyles.js
import { StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95A2F1',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  headline1:{
    fontSize: 25,
    marginBottom: 60,
    color: '#95A2F1',
    fontWeight: 'bold',
  },

  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white', // Set the background color to white
    borderRadius: 20, // Add rounded corners. Adjust this value to control the curvature
    width: 300,
    padding: 10, // Add some padding inside the text inputs
    borderWidth: 1, // Optional: add a border
    borderColor: '#ddd', // Optional: set the border color, light grey for subtle effect
    marginBottom: 25, // Add some space between the inputs
    // Additional styles for the "bubble" effect
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android
  },

  button: {
    backgroundColor: '#E4E6F9', //lighter
    borderColor: 'black',
    borderWidth: 1,
    padding: 14,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: 'black', 
    borderColor: 'black', 
    borderWidth: 1, 
    borderRadius: 17, 
    padding:23, 
    margin:30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20,
  },
  requestbutton: {
    backgroundColor: '#95A2F1',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    width: '50%',
    alignItems: 'center',
    margin: 10,
  },
  map: {
    height: '80%',
    width: '100%'
  },
  sedanIcon: {
    width: 50,
    height: 50,
    tintColor: '#95A2F1'
  },

  selectedButton: {
    backgroundColor: '#95A2F1', //darker
    borderColor: 'black',
    borderWidth: 1,
    padding: 14,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    margin: 5,
  },

  selectedButtonText: {
    color: 'white',
    fontSize: 15,
  },
  mapPickup: {
    height: '50%',
    width: '100%'
  },
  mapWaiting: {
    height: '30%',
    width: '100%'
  },
  mapOverlay: {
    position: "absolute",
    bottom: 50,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 5,
    padding: 16,
    left: "25%",
    width: "50%",
    textAlign: 'center',
  },

  submitOverlay: {
    backgroundColor: 'black', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin:10,
    position: "absolute",
    bottom: 50,
    padding: 16,
    left: "25%",
    width: "50%",
    textAlign: 'center',
  },

  LocationsSearchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
    
  },

  LocationsButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  LocationsButtonText: {
    textAlign: "center",
    color: "white"
  },



});