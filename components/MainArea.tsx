import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons, Fontisto, FontAwesome6, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { normalize, normalizeHeight} from '../styles/globalDimension';
export default function MainArea() {
  return (
    <View style={styles.container}>
      <View style={styles.iconsTop}>

          <View style={styles.leftTop}>
            <TouchableOpacity>
              <MaterialCommunityIcons name="lightbulb-off" size={normalize(24)} color="#231dd3"/>
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons name="lightbulb" size={normalize(24)} color="#231dd3"/>
            </TouchableOpacity>
          </View>

          <View style={styles.rightTop}>
            <TouchableOpacity style={styles.icon}>
              <AntDesign name="calendar" size={normalize(24)} color="#231dd3" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <FontAwesome6 name="hand-pointer" size={normalize(24)} color="#231dd3"/>
            </TouchableOpacity>
          </View>

      </View>

      <View style={styles.tableContainer}>

      </View>

      <View style={styles.iconsBottom}>
          <View style={styles.leftBottom}>
            <TouchableOpacity style={styles.icon}>
              <Ionicons name="folder-open-outline" size={normalize(24)} color="#231dd3"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Fontisto name="save" size={normalize(20)} color="#231dd3"/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <FontAwesome6 name="eraser" size={normalize(24)} color="#231dd3"/>
          </TouchableOpacity>
          
          <View style={styles.rightBottom}>
            <TouchableOpacity style={styles.icon}>
              <AntDesign name="upload" size={normalize(24)} color="#231dd3"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <AntDesign name="download" size={normalize(24)} color="#231dd3"/>
            </TouchableOpacity>
          </View>

      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '5%', // making space from the upper text
    width: normalize(250),
    height:normalizeHeight(350),
    borderWidth: normalize(2),
    borderColor: '#231dd3',
    borderRadius: normalize(10),
    alignSelf: 'center', // Center the container horizontally
  },
  iconsTop: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically in the row
    justifyContent: 'space-between', // Distribute items evenly along the row
    padding: normalize(10),
  },
  iconsBottom: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically in the row
    justifyContent: 'space-between', // Distribute items evenly along the row
    padding: normalize(10),
  },
  tableContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: normalize(5),
    marginVertical: normalize(10),
  },
  rightTop: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically in the row
    justifyContent: 'flex-end', // Align items to the end of the row
  },
  rightBottom: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically in the row
    justifyContent: 'flex-end', // Align items to the end of the row
  },
  leftTop: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically in the row
    justifyContent: 'flex-start', // Align items to the end of the row
  },
  leftBottom: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically in the row
    justifyContent: 'flex-start', // Align items to the end of the row
  },
  icon:{
    padding: normalize(5),
  }
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
