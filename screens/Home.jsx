import React from 'react'
import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '@/styles/global';
import HebrewDate  from '@/components/HebrewDate';
export default function Home({ navigation }) {
  return (
    <View style={globalStyles.homeMainView}>
      <Header nav={navigation}/>
        <View style={styles.texts}>
          <Text style={styles.text_element}>ארץ ישראל</Text>
          <HebrewDate textStyle={styles.text_element} />
          <Text style={styles.text_element}>זריחה:</Text>
          <Text style={styles.text_element}>שקיעה:</Text>  
        </View>
      <View style={styles.bodyContainer}>
        {/* <Text>body</Text> */}

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  bodyContainer: {
    flex: 4,
  },
  texts:{
    marginTop:'4%',
  },
  text_element: {
    color:'#231dd3',
    alignSelf:'flex-end',
    marginRight:'2%',
  },
});

