import { Image, StyleSheet, Platform, View } from 'react-native';
import LoginFormik from '@/components/Login';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LoginFormik />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  },
 
});


