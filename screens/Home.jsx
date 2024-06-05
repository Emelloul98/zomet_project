import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '@/styles/global';
import HebrewDate  from '@/components/HebrewDate';
// import Table from "Table.tsx";
export default function Home({ navigation }) {
  const sunrise="6:00";
  const sunset="18:00";
  const country="ישראל";
  return (
      <View style={globalStyles.homeMainView}>
        <Header nav={navigation} settingsOrSched='Settings' iconeType="settings-outline"/>
        <View style={globalStyles.bodyContainer}>
            <View style={styles.texts}>
              <Text style={styles.text_element}>ארץ {country}</Text>
              <HebrewDate textStyle={styles.text_element} />
              <Text style={styles.text_element}>זריחה: {sunrise}</Text>
              <Text style={styles.text_element}>שקיעה:{sunset}</Text>  
            </View>
            <View style={styles.table}>
              
            </View>
        </View>

      </View>
  );
}

const styles = StyleSheet.create({
  texts:{
    marginTop:'4%',
  },
  text_element: {
    color:'#231dd3',
    alignSelf:'flex-end',
    marginRight:'2%',
    fontWeight:'bold'
  },
  table:{

  }
});

