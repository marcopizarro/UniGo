import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheet';

export default function Profile(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff' }}>
      <Text style={{ color: '#736CC1', fontSize: 25, fontWeight: 'bold', marginBottom: 80 }}>Profile info here.</Text>
      <StatusBar style="auto" />

      <TouchableOpacity
      style={styles.requestbutton}
      onPress={props.handleSignOut}
     >
        <Text style={styles.submitButtonText}>SignOut?</Text>
     </TouchableOpacity>
    </View>
    
  );
}