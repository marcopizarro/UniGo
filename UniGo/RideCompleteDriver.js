import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { styles } from './StyleSheet';
import ProfileButton from './ProfileButton';


export default function RideCompleteDriver({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff' }}>
      <Text style={{ color: '#003FFA', fontSize: 30, fontWeight: 'bold' }}>Ride has been completed!</Text>
      <Image
      source={{ uri: 'https://media.giphy.com/media/10bKPDUM5H7m7u/giphy.gif' }}
      style={{ width: 300, height: 360 }}
      resizeMode='contain'
    />
      <StatusBar style="auto" />

      <TouchableOpacity style={styles.nextRidebutton} onPress={() => navigation.navigate('WelcomeScreenDriver')}>
        <Text style={styles.submitButtonText}>Next Ride</Text>
      </TouchableOpacity>
    </View>
    
  );
}

