import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './StyleSheet';


export default function RideCompletedScreen({ navigation }) {
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 30, padding: 10}}>Your ride has been completed!</Text>
    <Image
      source={{ uri: 'https://media.giphy.com/media/10bKPDUM5H7m7u/giphy.gif' }}
      style={{ width: 300, height: 360 }}
      resizeMode='contain'
    />
    <TouchableOpacity
      style={styles.submitButton}
      onPress={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'WelcomeScreen' }],
        });
      }}
      >
      <Text style={styles.submitButtonText}>Done!</Text>
    </TouchableOpacity>
    <StatusBar style="auto" />
  </View>
  );
}