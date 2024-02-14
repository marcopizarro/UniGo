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
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#746CC7',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

