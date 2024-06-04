import React from "react";
import Navigator from "../routes/LoginAndHomeStack";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
        <Navigator />
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

