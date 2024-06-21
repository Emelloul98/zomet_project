import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import {
  Ionicons,
  FontAwesome6,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { normalize, normalizeHeight } from "../styles/globalDimension";
import TableComponent, { Schedule } from "./TableComponent";
import { sendCurrentData, getCurrentData } from "./TableFunctionality";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


export default function MainArea() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const upLoadFromFileSystem = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });
      if (result.canceled === false) {
        const response = await fetch(result.assets[0].uri); // Fetch the data from the file uri
        const fileData = await response.text(); // Get the data as text
        const jsonData = JSON.parse(fileData); // Parse the JSON string
        setSchedules(jsonData); //todo check if the data is in the correct format
      }

    } catch (error) {
      Alert.alert('Error', `There was an error reading the file: ${error}`);
    }

  };


  const saveToFileSystem = async () => {
    try {
      const fileName = 'schedule.json';
      const fileUri = FileSystem.documentDirectory + fileName;

      // Write the data to the file
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(schedules));  

      // Check if sharing is available
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'Sharing is not available on this device');
        return;
      }

      // Share the file
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert('Error', `There was an error saving the file: ${error}`);
    }
  };


  const handleSendData = () => {
    sendCurrentData(schedules);
  };
  const handleGetCurrentData = () => {
    getCurrentData(setSchedules);
  };
  const handleDeleteTable = () => {
    setSchedules([]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconsTop}>
        <View style={styles.leftTop}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="lightbulb-off-outline"
              size={28}
              color="#231dd3"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="lightbulb-outline"
              size={28}
              color="#231dd3"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rightTop}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons
              name="calendar-number-outline"
              size={normalize(26)}
              color="#231dd3"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome6
              name="hand-pointer"
              size={normalize(24)}
              color="#231dd3"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <TableComponent schedules={schedules} setSchedules={setSchedules} />
      </ScrollView>

      <View style={styles.iconsBottom}>
        <View style={styles.leftBottom}>
          <TouchableOpacity style={styles.icon} onPress={upLoadFromFileSystem}>
            <Ionicons
              name="folder-open-outline"
              size={normalize(26)}
              color="#231dd3"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={saveToFileSystem}>
            <Ionicons
              name="save-outline"
              size={normalize(24)}
              color="#231dd3"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Ionicons
            name="trash-outline"
            size={normalize(24)}
            color="#231dd3"
            onPress={handleDeleteTable}
          />
        </TouchableOpacity>

        <View style={styles.rightBottom}>
          <TouchableOpacity style={styles.icon}>
            <AntDesign
              name="upload"
              size={normalize(24)}
              color="#231dd3"
              onPress={handleGetCurrentData}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <AntDesign
              name="download"
              size={normalize(24)}
              color="#231dd3"
              onPress={handleSendData}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%", // making space from the upper text
    width: normalize(300),
    height: normalizeHeight(350),
    borderWidth: normalize(2),
    borderColor: "#231dd3",
    borderRadius: normalize(10),
    alignSelf: "center", // Center the container horizontally
  },
  iconsTop: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically in the row
    justifyContent: "space-between", // Distribute items evenly along the row
    padding: normalize(10),
  },
  iconsBottom: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically in the row
    justifyContent: "space-between", // Distribute items evenly along the row
    padding: normalize(10),
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
  rightTop: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically in the row
    justifyContent: "flex-end", // Align items to the end of the row
  },
  rightBottom: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically in the row
    justifyContent: "flex-end", // Align items to the end of the row
  },
  leftTop: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically in the row
    justifyContent: "flex-start", // Align items to the end of the row
  },
  leftBottom: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically in the row
    justifyContent: "flex-start", // Align items to the end of the row
  },
  icon: {
    padding: normalize(5),
  },
});

// const scheduleData = {
//   switchID: 1,
//   scheduleID: 1,
//   Schedules: {
//     Schedule_1: {
//       switchID: 1,
//       scheduleID: 1,
//       isActive: true,
//       repMode: 'Daily',
//       timeModeON: 'AM',
//       dayON: 1,
//       monON: 1,
//       yearON: 2024,
//       hourON: 8,
//       minON: 0,
//       timeModeOFF: 'PM',
//       dayOFF: 1,
//       monOFF: 1,
//       yearOFF: 2024,
//       hourOFF: 6,
//       minOFF: 0,
//     },
//   },
// };
