import React from 'react'
import { ScrollView, StyleSheet, Platform, View, Text } from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '../styles/global';
import { height } from '../styles/globalJS';

export default function Settings({ navigation }) {

  return (
    <ScrollView style={styles.scrollViewContent}>
      <Header nav={navigation} settingsOrSched="Home" iconeType="schedular-outline" />
      <View style={styles.clockSettings}>
        <Text style={globalStyles.zomet_text}>הגדרות השעון:</Text>
        <View style={styles.currentTime}>
          <Text style={globalStyles.zomet_text}>זמן נוכחי בשעון:</Text>
          <Text style={globalStyles.zomet_text}>זמן נוכחי:</Text>
        </View>
        <Text style={globalStyles.zomet_text}>זמן אחר:</Text>
      </View>

      <Text style={globalStyles.zomet_text}>נתוני השעון</Text>
      <Text style={globalStyles.zomet_text}>שם: </Text>
      <Text style={globalStyles.zomet_text}>גרסת תוכנה: </Text>
      <Text style={globalStyles.zomet_text}>אזור זמן: </Text>
      <Text style={globalStyles.zomet_text}>זמן עולמי: </Text>
      <Text style={globalStyles.zomet_text}>תאריך עברי: </Text>
      <Text style={globalStyles.zomet_text}>זריחה במישור: </Text>
      <Text style={globalStyles.zomet_text}>שקיעה במישור: </Text>
      <Text style={globalStyles.zomet_text}>נתוני המערכת</Text>
      <Text style={globalStyles.zomet_text}>אזור זמן: </Text>
      <Text style={globalStyles.zomet_text}>זמן מקומי: </Text> 
      {/* </View>  */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  clockSettings: {
    height: height * 0.25,
    backgroundColor: 'red',
  },
  currentTime: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  }

});