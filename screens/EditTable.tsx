import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Button,
  Platform,
  Linking,
  Image,
  AppState,
} from "react-native";
import Header from "../components/Header";
import { globalStyles } from "../styles/global";
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { normalize, normalizeHeight } from "../styles/globalDimension";
import DropdownComponent from "../components/DropdownComponent";
import TableComponent, { Schedule } from "../components/TableComponent";
import {
  sendCurrentData,
  getCurrentData,
  setSwitchMode,
  setLightMode,
} from "../components/TableFunctionality";
import Popup from "../components/Popup";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

type screenProps = {
  navigation: any;
};

export default function EditTable(props: screenProps) {
  const [schedules, setSchedules] = useState<Schedule[][]>([[], []]);
  const [curIndex, setCurIndex] = useState(0);
  const [schedule, setSchedule] = useState<Schedule[]>(schedules[curIndex]);
  const [fileName, setFileName] = useState("schedule.json");
  const [modalVisible, setModalVisible] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [fingerPress, setFingerPress] = useState(false);
  const [lightOff, setLightOff] = useState(true);
  const [connectToChip, setConnectToChip] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const isInitialRender = useRef(true);

  const ZAC_URL = "http://192.168.4.1";
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000); // Hide the popup after one second
    }
  }, [connectToChip]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1500);

          try {
            // Make the fetch request with a timeout
            const response = await fetch(`${ZAC_URL}/Get?Status`, {
              method: "GET",
              signal: controller.signal,
            });

            // Clear the timeout if the request completed successfully
            clearTimeout(timeoutId);

            if (response.ok) {
              const data = await response.json();
              if (data.hasOwnProperty("zacName")) {
                setConnectToChip(true);
              } else {
                setConnectToChip(false);
              }
            }
          } catch (error: any) {
            setConnectToChip(false);
          }
        }
        appState.current = nextAppState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // Update schedules[curIndex] when schedule changes
    setSchedules((prevSchedules) => {
      const updatedSchedules = [...prevSchedules];
      updatedSchedules[curIndex] = schedule;
      return updatedSchedules;
    });
  }, [schedule]);

  useEffect(() => {
    // Perform any side effects if needed
    setForceRender(false);
  }, [schedules[curIndex], forceRender]);

  const isSwitchIDValid = (schedule: any) => "switchID" in schedule;

  const upLoadFromFileSystem = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const response = await fetch(result.assets[0].uri); // Fetch the data from the file uri
        const fileData = await response.text(); // Get the data as text
        const jsonData = JSON.parse(fileData); // Parse the JSON string

        // check if the file is in the correct format
        if (
          Array.isArray(jsonData) &&
          jsonData.every(
            (scheduleArray) =>
              Array.isArray(scheduleArray) &&
              scheduleArray.every(
                (schedule) => schedule && isSwitchIDValid(schedule)
              )
          )
        ) {
          setSchedules(jsonData);
        } else {
          Alert.alert("שגיאה", "הקובץ איננו בפורמט הנכון");
        }
      }
    } catch (error) {
      Alert.alert("שגיאה", "אירעה שגיאה בטעינת הקובץ");
    }
  };

  const saveToFileSystem = async (fileName: string) => {
    try {
      let fileUri = `${FileSystem.documentDirectory}${fileName}`; // Use documentDirectory for both platforms

      // Write the data to the file
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(schedules));

      // Check if sharing is available
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Error", "Sharing is not available on this device");
        return;
      }

      // Share the file
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert("Error", `There was an error saving the file: ${error}`);
    }
  };

  const openDeviceSettings = async () => {
    try {
      if (Platform.OS === "ios") {
        const url = "App-Prefs:root=WIFI"; // This should directly open WiFi settings on iOS
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert("שגיאה בפתיחת הגדרות המכשיר");
        }
      } else {
        Linking.sendIntent("android.settings.SETTINGS");
      }
    } catch (error) {
      console.error("Error opening device settings:", error);
    }
  };

  const handleSendData = async () => {
    await sendCurrentData(
      schedules[curIndex],
      setSchedule,
      curIndex,
      setConnectToChip
    );
    setForceRender(true);
  };
  const handleGetCurrentData = () => {
    getCurrentData(setSchedule, curIndex, setConnectToChip);
  };
  const handleDeleteTable = () => {
    setSchedule([]); //
  };
  const handleSavePress = () => {
    setFileName("schedule.json");
    setModalVisible(true);
  };

  const handleSaveConfirm = () => {
    setModalVisible(false);
    setTimeout(() => {
      saveToFileSystem(fileName);
    }, 500); // Delay to ensure modal is fully closed before executing the save function
  };

  return (
    <View style={globalStyles.screenContainer}>
      {connectToChip && (
        <Popup visible={showPopup} message={"השעון חובר בהצלחה!"} />
      )}
      {!connectToChip && (
        <Popup visible={showPopup} message={"השעון אינו מחובר"} />
      )}
      <Header
        navigation={props.navigation}
        backIcon={false}
        isConnect={connectToChip}
      />
      <View style={styles.secondArea}>
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
          <Text style={styles.buttonText}>התחבר לשעון</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.thirdAreaContainer}>
        <View style={styles.thirdArea}>
          <TouchableOpacity
            onPress={() =>
              setSwitchMode(curIndex, "schedule", setConnectToChip)
            }
          >
            <Ionicons
              name="calendar-number-outline"
              size={normalize(26)}
              color="#ffa200"
              style={
                !fingerPress && connectToChip
                  ? { opacity: 0.5 }
                  : { opacity: 1 }
              }
              onPress={() => setFingerPress(false)}
            />
          </TouchableOpacity>
          {connectToChip && (
            <TouchableOpacity
              onPress={() => {
                setSwitchMode(curIndex, "manual", setConnectToChip);
                setFingerPress(!fingerPress);
              }}
            >
              <FontAwesome
                name="hand-pointer-o"
                size={normalize(24)}
                color="#ffa200"
                style={fingerPress ? { opacity: 0.5 } : { opacity: 1 }}
                onPress={() => setFingerPress(true)}
              />
            </TouchableOpacity>
          )}
          <DropdownComponent
            data={[
              { label: " מפסק 1", value: "0" },
              { label: " מפסק 2", value: "1" },
            ]}
            currentValue={String(curIndex)}
            onValueChange={(value) => {
              setCurIndex(Number(value));
              setSchedule(schedules[curIndex]);
            }}
          />
        </View>
      </View>

      {!fingerPress && (
        <View style={styles.fourthArea}>
          <View style={styles.table_container}>
            <ScrollView>
              <TableComponent
                schedules={schedules[curIndex]}
                setSchedule={setSchedule}
                swID={curIndex + 1}
              />
            </ScrollView>
            <View style={styles.iconsBottom}>
              <View style={styles.leftBottom}>
                <TouchableOpacity
                  style={styles.table_icon}
                  onPress={upLoadFromFileSystem}
                >
                  <Ionicons
                    name="folder-open-outline"
                    size={normalize(26)}
                    color="#ffa200"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.table_icon}
                  onPress={handleSavePress}
                >
                  <Ionicons
                    name="save-outline"
                    size={normalize(24)}
                    color="#ffa200"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="trash-outline"
                  size={normalize(24)}
                  color="#ffa200"
                  onPress={handleDeleteTable}
                />
              </TouchableOpacity>
              {connectToChip && (
                <View style={styles.rightBottom}>
                  <TouchableOpacity style={styles.table_icon}>
                    <AntDesign
                      name="upload"
                      size={normalize(24)}
                      color="#ffa200"
                      onPress={handleGetCurrentData}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.table_icon}>
                    <AntDesign
                      name="download"
                      size={normalize(24)}
                      color="#ffa200"
                      onPress={handleSendData}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      {fingerPress && (
        <View style={styles.fourthArea}>
          {!lightOff && (
            <TouchableOpacity
              onPress={() => {
                setLightMode(curIndex, "ON", setConnectToChip);
                setLightOff(true);
              }}
            >
              <Image
                source={require("../assets/images/lightOff.jpg")}
                style={{ width: normalize(140), height: normalizeHeight(260) }} // Adjust size as needed
              />
            </TouchableOpacity>
          )}

          {lightOff && (
            <TouchableOpacity
              onPress={() => {
                setLightMode(curIndex, "OFF", setConnectToChip);
                setLightOff(false);
              }}
            >
              <Image
                source={require("../assets/images/lightOn.jpg")}
                style={{ width: normalize(250), height: normalizeHeight(275) }} // Adjust size as needed
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter file name:</Text>
            <TextInput
              placeholder="Enter file name"
              value={fileName}
              onChangeText={setFileName}
              style={styles.fileNameInput}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#666"
              />
              <View style={{ width: 10 }} />
              <Button
                title="Save"
                onPress={handleSaveConfirm}
                color="#007AFF"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  secondArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  connectText: {
    marginRight: "10%",
  },
  thirdAreaContainer: {
    marginTop: "10%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thirdArea: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
  texts: {
    marginTop: "4%",
  },

  button: {
    width: "70%",
    height: normalizeHeight(60),
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
    paddingLeft: normalize(20),
    position: "absolute",
    right: normalize(10), // Position the icon to the left edge of the button
    alignSelf: "center",
  },
  fourthArea: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  table_container: {
    width: normalize(300),
    height: normalizeHeight(320),
    borderWidth: normalize(2),
    borderColor: "#007E97",
    borderRadius: normalize(10),
    alignSelf: "center", // Center the container horizontally
  },
  iconsBottom: {
    flexDirection: "row-reverse",
    alignItems: "center", // Center items vertically in the row
    justifyContent: "space-between", // Distribute items evenly along the row
  },

  table_icon: {
    padding: normalize(5),
  },

  tableContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: normalize(5),
    marginVertical: normalize(10),
  },

  rightBottom: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically in the row
    justifyContent: "flex-end", // Align items to the end of the row
  },

  leftBottom: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically in the row
    justifyContent: "flex-start", // Align items to the end of the row
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20, // Rounded corners
    padding: 20,
    alignItems: "center",
    elevation: 5,
    minWidth: 300,
  },
  modalText: {
    fontSize: 16,
  },

  fileNameInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center buttons horizontally
    marginTop: 10,
  },
});
