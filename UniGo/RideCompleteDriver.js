import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet';
import ProfileButton from './ProfileButton';


export default function RideCompleteDriver({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#736CC1', fontSize: 25, fontWeight: 'bold', marginBottom: 80 }}>Ride has been completed!</Text>
      <StatusBar style="auto" />

      {/* ProfileButton component added to the header
      <ProfileButton navigation={navigation} /> */}

      <TouchableOpacity style={styles.welcomeDriverbutton} onPress={() => navigation.navigate('WelcomeScreenDriver')}>
        <Text style={styles.submitButtonText}>Next Ride</Text>
      </TouchableOpacity>
    </View>
    
  );
}

