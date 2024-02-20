import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from './styleSheet';


export default function MatchApproved() {
  return (
    <View style={styles.container}>
      <Text>You have arrived!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
