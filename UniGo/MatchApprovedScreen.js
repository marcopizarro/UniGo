import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from './StyleSheet';


export default function MatchApproved() {
  return (
    <View style={styles.container}>
      <Text>You have been matched with a Driver!</Text>
      <Text>Your driver is: Student Driver #02</Text>
      <StatusBar style="auto" />
    </View>
  );
}
