import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from './StyleSheet';


export default function RideCompletedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Your ride has been completed!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
