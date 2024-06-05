import React from 'react'
import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '../styles/global';

export default function Settings({navigation}) {
  
  return (
    <View style={globalStyles.homeMainView}>
      <Header nav={navigation} settingsOrSched="Home" iconeType="schedular-outline"/>
      <View style={globalStyles.bodyContainer}>
        <View style={styles.clockSettings}>
          <Text style={globalStyles.zomet_text}>הגדרות השעון:</Text>
          <View style={styles.currentTime}>
            <Text style={globalStyles.zomet_text}>זמן נוכחי בשעון:</Text>
            <Text style={globalStyles.zomet_text}>זמן נוכחי:</Text>
          </View>
          <Text style={globalStyles.zomet_text}>זמן אחר:</Text>
        </View>
        <View style={styles.dataSettings}>
        </View>
         
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clockSettings:{
    flex: 1,
    backgroundColor: 'red',
    // padding: 50,
  },
  currentTime:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dataSettings:{
    flex: 2,
    backgroundColor: 'blue',
  }
 
});


