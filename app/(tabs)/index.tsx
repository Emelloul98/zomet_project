import React, { useEffect } from "react";
import Navigator from "../../routes/LoginAndHomeStack";
import { SafeAreaView, StyleSheet, StatusBar, I18nManager } from "react-native";

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
    paddingTop: StatusBar.currentHeight,
  },
});
