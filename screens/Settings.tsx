import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  I18nManager,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import { globalStyles } from "../styles/global";
import { height } from "../styles/globalDimension";
import moment from "moment";
import Popup from "../components/Popup";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { normalize, normalizeHeight } from "../styles/globalDimension";

const ZAC_URL = "http://192.168.4.1";

type screenProps = {
  navigation: any;
};

export default function Settings(props: screenProps) {
  const [currentTime, setCurrentTime] = useState(moment().format("HH:mm:ss"));
  const [name, setName] = useState("");
  const [firmwareVersion, setFirmwareVersion] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [hDateString, setHDateString] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [LocalTime, setLocalTime] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000); // Hide the popup after one second
    }
  }, [updateSuccess]);

  const route = useRoute();
  const isConnectToChip = route.params as { isConnectToChip: boolean };

  useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);

    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("HH:mm:ss"));
    }, 1000); // Update every second

    if (isConnectToChip.isConnectToChip) {
      fetchData();
    }

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${ZAC_URL}/Get?Status`, {
        method: "GET",
        headers: {
          data: "json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setName(data.zacName);
        setFirmwareVersion(data.zacFirmwareVersion);
        setTimeZone(data.zacTimeZoneString);
        setHDateString(data.zacHDateString);
        setSunrise(data.zacLocalSunRiseString);
        setSunset(data.zacLocalSunSetString);
        setLocalTime(data.zacLocalDateTimeString);
      } else {
        console.error("Response not OK:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onClickSetDateTimeNow = async () => {
    const now = new Date();
    const jsonDateTime = {
      utcDayOfMonth: now.getUTCDate(),
      utcMonth: now.getUTCMonth() + 1,
      utcYear: now.getUTCFullYear(),
      utcHours: now.getUTCHours(),
      utcMinutes: now.getUTCMinutes(),
      utcSeconds: now.getUTCSeconds(),
      utcWDay: now.getUTCDay(),
    };

    try {
      const response = await fetch(`${ZAC_URL}/Post?DateTimeUTC`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonDateTime),
      });

      if (response.ok) {
        setUpdateSuccess(true);
      } else {
        setUpdateSuccess(false);
      }
    } catch (error) {
      setUpdateSuccess(false);
      Alert.alert("Error");
    }
  };

  return (
    <ScrollView style={globalStyles.screenContainer}>
      {!updateSuccess && (
        <Popup visible={showPopup} message={"העדכון לא הצליח!"} />
      )}
      {updateSuccess && <Popup visible={showPopup} message={"העדכון הצליח!"} />}

      <Header navigation={props.navigation} backIcon={true} isConnect={false} />
      <View style={styles.settings}>
        <Text style={styles.zomet_settings_text_h2}>הגדרות השעון</Text>
        <View style={styles.settingItem}>
          <Text style={styles.zomet_settings_text}>
            זמן נוכחי: {currentTime}
          </Text>
          <Text style={styles.zomet_settings_text}>
            זמן נוכחי בשעון: {LocalTime}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onClickSetDateTimeNow()}
          >
            <Text style={styles.buttonText}>עדכן שעה בשעון</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.zomet_settings_text_h2}>נתוני השעון</Text>

        <View style={styles.settingItem}>
          <Text style={styles.zomet_settings_text}>שם: {name}</Text>

          <Text style={styles.zomet_settings_text}>
            גרסת תוכנה: {firmwareVersion}
          </Text>

          <Text style={styles.zomet_settings_text}>אזור זמן: {timeZone}</Text>

          <Text style={styles.zomet_settings_text}>
            תאריך עברי: {hDateString}
          </Text>

          <Text style={styles.zomet_settings_text}>
            זריחה במישור: {sunrise}
          </Text>

          <Text style={styles.zomet_settings_text}>שקיעה במישור: {sunset}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  settings: {
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  settingItem: {
    width: "90%",
    marginBottom: 10,
  },
  zomet_settings_text: {
    flex: 1,
    color: "#007E97",
    fontSize: 20,
    flexWrap: "wrap",
    width: "100%", // Ensure text uses available width
  },

  zomet_settings_text_h2: {
    color: "#ffa200",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 12,
  },

  buttonContainer: {
    width: "40%",
    height: normalizeHeight(40),
    marginTop: normalizeHeight(10),
    backgroundColor: "#007E97",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#007E97",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    position: "absolute",
    alignSelf: "center",
  },
});
