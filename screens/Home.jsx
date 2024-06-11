import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { globalStyles } from "@/styles/global";

export default function Home({ navigation }) {

  const [connection, setConnection] = useState(false);

  return (
    <View style={globalStyles.screenContainer}>
      <Header nav={navigation} />
      <View style={styles.container}>
        {connection && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditTable")}
          >
            <Text style={styles.buttonText}>ערוך טבלת שעון</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("חיפוש שעון טרם מומש")}
        >
          <Text style={styles.buttonText}>חפש שעון חדש</Text>
        </TouchableOpacity>
        {!connection && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditTable")}
            >
            <Text style={styles.buttonText}>ערוך טבלה offline</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setConnection(!connection)}
        >
          <Text style={styles.buttonText}>שנה מצב חיבור</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  texts: {
    marginTop: "4%",
  },
  text_element: {
    color: "#231dd3",
    alignSelf: "flex-end",
    marginRight: "2%",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    padding: 20,
    backgroundColor: "#6200EE",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
