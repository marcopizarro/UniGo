
// AppStyles.js
import { StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003FFA',
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

  headline1: {
    fontSize: 25,
    marginBottom: 60,
    color: '#167DEB',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
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
    borderColor: 'black', // Optional: set the border color, light grey for subtle effect
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
    backgroundColor: '#D6E4FF', //lighter
    borderColor: 'black',
    borderWidth: 2,
    padding: 14,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    margin: 5,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },

  areYouOkButton: {
    backgroundColor: '#C9E2FF', //A
    borderColor: 'black',
    borderWidth: 2,
    padding: 14,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    margin: 5,
  },

  submitButton: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 17,
    padding: 17,
    margin: 30,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },

  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "700",
  },

  requestbuttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "500",
  },

  requestbutton: {
    backgroundColor: 'black',
    borderColor: '#003FFA',
    borderWidth: 1,
    padding: 18,
    borderRadius: 17,
    width: '70%',
    alignItems: 'center',
    margin: 120,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  welcomeDriverbutton: {
    backgroundColor: '#D6E4FF',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '70%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  nextRidebutton: {
    backgroundColor: '#003FFA',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '70%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  acceptRidebutton: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '45%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  chatButton: {
    backgroundColor: '#D6E4FF',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row', // This aligns children horizontally
    alignItems: 'center',
    width: '45%',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },

  arrivedbutton: {
    backgroundColor: '#D6E4FF',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '95%',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  declinebutton: {
    backgroundColor: '#D22B2B',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '95%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  arrivedbutton: {
    backgroundColor: '#D6E4FF',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '95%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  arrivedbutton: {
    backgroundColor: '#D6E4FF',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '95%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  declinebutton: {
    backgroundColor: '#D22B2B',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '45%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },

  cancelbutton: {
    backgroundColor: '#FF7A7A',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '45%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  cancelbutton: {
    backgroundColor: '#D22B2B',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '95%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  cancelbutton: {
    backgroundColor: '#D22B2B',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '95%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },
  map: {
    height: '80%',
    width: '100%'
  },
  sedanIcon: {
    width: 50,
    height: 50,
    tintColor: '#003FFA'
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 35,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    alignContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#003FFA', //darker
    borderColor: 'black',
    borderWidth: 2,
    padding: 14,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    margin: 5,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 6 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on
  },

  selectedButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  mapPickup: {
    height: '50%',
    width: '100%'
  },
  mapWaiting: {
    height: '30%',
    width: '100%'
  },
  mapAcceptRide: {
    top: -130,
    height: '70%',
    width: '100%'
  },
  mapDriver: {
    top: -80,
    height: '80%',
    width: '100%'
  },
  mapDriveToDest: {
    top: -230,
    height: '70%',
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

  imageUploadBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 50,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },

  sitOverlay: {
    backgroundColor: 'black', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 10,
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

  profileButton: {
    position: 'absolute',
    top: -20,
    right: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  profileIcon: {
    width: 40,
    height: 40,
    tintColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  headToPickupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  startTripContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: '5%',
    right: '5%',
    width: '90%',
  },
  startTripbutton: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '97%',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 8,
    alignSelf: 'center'
  },

  startTripButtonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 18,
  },

  endButton: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    width: '95%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 7, // Shadow blur radius
    // Android elevation
    elevation: 8, // This adds depth to the button on 
  },

});
