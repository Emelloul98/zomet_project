import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Platform,
  Linking,
  Alert,
} from "react-native";
import Header from "../components/Header";
import { globalStyles } from "@/styles/global";
import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";
import { normalize, normalizeHeight, width } from "@/styles/globalDimension";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

const FadeInView: React.FC<FadeInViewProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

type ScreenProps = {
  navigation: any;
};
const openDeviceSettings = async () => {
  try {
    if (Platform.OS === "ios") {
      const url = "App-Prefs:root=WIFI"; // This should directly open WiFi settings on iOS
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("אין אפשרות לפתוח הגדרות במכשיר זה");
      }
    } else {
      Linking.sendIntent("android.settings.SETTINGS");
    }
  } catch (error) {
    console.error("Error opening device settings:", error);
    Alert.alert("שגיאה בפתיחת הגדרות המכשיר");
  }
};

export default function Home(props: ScreenProps) {
  const [connection, setConnection] = useState(false);

  return (
    <View style={globalStyles.screenContainer}>
      <Header
        navigation={props.navigation}
        settingsIcon=""
        backIcon=""
        whereToBack=""
      />
      <FadeInView style={styles.smart_home_img_container}>
        <Image
          source={require("../assets/images/zomer_home.jpg")}
          style={styles.smart_home_img}
        />
      </FadeInView>
      <View style={styles.container}>
        {connection && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("EditTable")}
          >
            <MaterialCommunityIcons
              name="clock-edit-outline"
              color="#fff"
              size={normalize(16)}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>ערוך טבלת שעון</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => openDeviceSettings()}
        >
          <FontAwesome
            name="search"
            color="#fff"
            size={normalize(16)}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>חפש שעון חדש</Text>
        </TouchableOpacity>
        {!connection && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("EditTable")}
          >
            <MaterialIcons
              name="edit-calendar"
              size={normalize(16)}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>ערוך טבלה offline</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.temp_button}
          onPress={() => setConnection(!connection)}
        >
          <Text style={styles.buttonText}>שנה מצב חיבור</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  smart_home_img_container: {
    width: width,
    height: normalizeHeight(200),
    marginTop: normalize(20),
  },
  smart_home_img: {
    width: "100%",
    height: "100%",
  },
  texts: {
    marginTop: "4%",
  },
  textElement: {
    color: "#231dd3",
    alignSelf: "flex-end",
    marginRight: "2%",
    fontWeight: "bold",
  },
  container: {
    marginTop: normalize(50),
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    width: "90%",
    height: normalizeHeight(50),
    backgroundColor: "#231dd3",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    left: 0, // Align the text to the left edge of the button
    right: 0, // Ensure the text doesn't overflow the button
    paddingLeft: normalize(10), // Add padding to the left of the text
  },
  icon: {
    marginLeft: 0, // Remove marginLeft
    paddingRight: normalize(10),
    position: "absolute",
    left: normalize(10), // Position the icon to the left edge of the button
    alignSelf: "center",
  },
  welcomeView: {
    marginTop: normalize(40),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  welcomeButton: {
    width: "90%",
    height: normalize(100),
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  temp_button: {
    width: "45%", // 50% smaller than the regular button
    height: normalizeHeight(50),
    backgroundColor: "red", // Red color
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: normalize(40),
    textAlign: "center",
    color: "#000",
  },
});
