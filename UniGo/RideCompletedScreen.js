import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from './StyleSheet';


export default function RideCompletedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>You have arrived!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
