// This is the main entry point for the app. It is responsible for rendering the navigator.
import React, { useEffect } from "react";
import Navigator from "../../routes/LoginAndHomeStack";
import { SafeAreaView, StyleSheet, StatusBar, I18nManager } from "react-native";

export default function App() {
  return (
    // SafeAreaView is a component that renders its children in a safe area that can be seen on all devices.
    <SafeAreaView style={styles.safeArea}>
      {/* The main navigator for the app which contains all the screens of the application. */}
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
