import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}> Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95A2F1', // App's background color',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    fontFamily: 'Avenir-Black', // Custom font for all text
  },

  button: {
    backgroundColor: '#746CC7',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },

});
