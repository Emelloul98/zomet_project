import React from "react";
import { ScrollView, StyleSheet, Platform, View, Text } from "react-native";
import Header from "../components/Header";
import { globalStyles } from "../styles/global";
import { height } from "../styles/globalDimension";

type screenProps = {
  navigation: any;
};
export default function Settings(props: screenProps) {
  return (
    <ScrollView style={globalStyles.screenContainer}>
      <Header navigation={props.navigation} settingsIcon="" backIcon="Back" whereToBack="EditTable" />
      <View style={styles.settings} >
        <Text style={globalStyles.zomet_text_h2}>הגדרות השעון</Text>
        <View style={styles.currentTime}>
          <Text style={globalStyles.zomet_text}>זמן נוכחי בשעון:</Text>
          <Text style={globalStyles.zomet_text}>זמן נוכחי:</Text>
        </View>
        <Text style={globalStyles.zomet_text}>זמן אחר:</Text>
        <Text style={globalStyles.zomet_text_h2}>נתוני השעון</Text>
        <Text style={globalStyles.zomet_text}>שם: </Text>
        <Text style={globalStyles.zomet_text}>גרסת תוכנה: </Text>
        <Text style={globalStyles.zomet_text}>אזור זמן: </Text>
        <Text style={globalStyles.zomet_text}>זמן עולמי: </Text>
        <Text style={globalStyles.zomet_text}>תאריך עברי: </Text>
        <Text style={globalStyles.zomet_text}>זריחה במישור: </Text>
        <Text style={globalStyles.zomet_text}>שקיעה במישור: </Text>
        <Text style={globalStyles.zomet_text_h2}>נתוני המערכת</Text>
        <Text style={globalStyles.zomet_text}>אזור זמן: </Text>
        <Text style={globalStyles.zomet_text}>זמן מקומי: </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  settings: {
    marginTop: height * 0.02,
  },
  currentTime: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
