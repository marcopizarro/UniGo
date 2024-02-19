// AppStyles.js
import { StyleSheet } from 'react-native';

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
  },
  text: {
    fontSize: 15,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    fontSize: 14,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    textAlign:'center'
  },
  button: {
    backgroundColor: '#E4E6F9',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: 'black', borderColor: 'black', borderWidth: 1, borderRadius: 5, padding:5, margin:10
  },
  submitbuttonText: {
    color: 'white',
    fontSize: 18,
  },
  requestbutton: {
    backgroundColor: '#736CC1',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    width: '50%',
    alignItems: 'center',
    margin: 10,
  },
});

