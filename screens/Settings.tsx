import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useRoute } from '@react-navigation/native';
import Header from "../components/Header";
import { globalStyles } from "../styles/global";
import { height } from "../styles/globalDimension";
import moment from "moment";

const ZAC_URL = "http://192.168.4.1";

type screenProps = {
  navigation: any;
};

export default function Settings( props: screenProps) {
  const [currentTime, setCurrentTime] = useState(moment().format("HH:mm:ss"));
  const [name, setName] = useState("");
  const [firmwareVersion, setFirmwareVersion] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [hDateString, setHDateString] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  const route = useRoute();
  const isConnectToChip = route.params as {isConnectToChip: boolean};
    
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("HH:mm:ss"));
    }, 1000); // Update every second

    if(isConnectToChip.isConnectToChip){
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
      } else {
        console.error("Response not OK:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollView style={globalStyles.screenContainer}>
      <Header navigation={props.navigation} backIcon={true} isConnect={false}/>
      <View style={styles.settings}>
        <Text style={styles.zomet_settings_text_h2}>הגדרות השעון</Text>
        <View style={styles.currentTime}>
          <Text style={styles.zomet_settings_text}>זמן נוכחי בשעון:</Text>
          <Text style={styles.zomet_settings_text}>זמן נוכחי: {currentTime} </Text>
        </View>
        <Text style={styles.zomet_settings_text_h2}>נתוני השעון</Text>
        <Text style={styles.zomet_settings_text}>שם: {name} </Text>
        <Text style={styles.zomet_settings_text}>
          גרסת תוכנה: {firmwareVersion}
        </Text>
        <Text style={styles.zomet_settings_text}>אזור זמן: {timeZone}</Text>
        <Text style={styles.zomet_settings_text}>תאריך עברי: {hDateString} </Text>
        <Text style={styles.zomet_settings_text}>זריחה במישור: {sunrise} </Text>
        <Text style={styles.zomet_settings_text}>שקיעה במישור: {sunset}</Text>
        {/* <Button title="קבל נתונים" onPress={fetchData} /> */}
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
    alignItems: "center",
  },
  differentTimeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "2%",
    marginTop: "2%",
    marginBottom: 8,
  },
  differentTime: {
    marginLeft: "2%",
    color: "#231dd3",
    fontSize: 20,
  },
  zomet_settings_text: {
    color:'#231dd3',
    alignSelf:'flex-end',
    marginRight:'2%',
    marginTop:'2%',
    fontSize:20, //toTo: I added this
    marginBottom: 8, //toTo: I added this
  },
  zomet_settings_text_h2: {
      color:'#231dd3',
      alignSelf:'flex-end',
      marginRight:'2%',
      marginTop:'2%',
      fontWeight:'bold',
      fontSize:25,
      marginBottom: 12,
  },

});


// import React, {useState, useEffect} from "react";
// import { ScrollView, StyleSheet, Platform, View, Text } from "react-native";
// import Header from "../components/Header";
// import { globalStyles } from "../styles/global";
// import { height } from "../styles/globalDimension";
// // import DatePicker from "../components/DatePicker";
// import moment from 'moment';

// type screenProps = {
//   navigation: any;
// };
// export default function Settings(props: screenProps) {
//   const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentTime(moment().format('HH:mm:ss'));
//     }, 1000); // Update every second

//     return () => clearInterval(intervalId); // Clean up on unmount
//   }, []);


//   return (
//     <ScrollView style={globalStyles.screenContainer}>
//       <Header navigation={props.navigation} backIcon={true} />
//       <View style={styles.settings} >
//         <Text style={styles.zomet_settings_text_h2}>הגדרות השעון</Text>
//         <View style={styles.currentTime}>
//           <Text style={styles.zomet_settings_text}>זמן נוכחי בשעון:</Text>
//           <Text style={styles.zomet_settings_text}>זמן נוכחי:  {currentTime} </Text>
//         </View>
//         <View style={styles.differentTimeContainer}>
//           {/* <DatePicker /> */}
//           <Text style={styles.differentTime}>זמן אחר:</Text>
//         </View>
//         <Text style={styles.zomet_settings_text_h2}>נתוני השעון</Text>
//         <Text style={styles.zomet_settings_text}>שם: </Text>
//         <Text style={styles.zomet_settings_text}>גרסת תוכנה: </Text>
//         <Text style={styles.zomet_settings_text}>אזור זמן: </Text>
//         <Text style={styles.zomet_settings_text}>זמן עולמי: </Text>
//         <Text style={styles.zomet_settings_text}>תאריך עברי: </Text>
//         <Text style={styles.zomet_settings_text}>זריחה במישור: </Text>
//         <Text style={styles.zomet_settings_text}>שקיעה במישור: </Text>
//         <Text style={styles.zomet_settings_text_h2}>נתוני המערכת</Text>
//         <Text style={styles.zomet_settings_text}>אזור זמן: </Text>
//         <Text style={styles.zomet_settings_text}>זמן מקומי: </Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   settings: {
//     marginTop: height * 0.02,
//   },
//   currentTime: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   differentTimeContainer: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginRight:'2%',
//     marginTop:'2%',
//     marginBottom: 8, 
//   },
//   differentTime: {
//     marginLeft: "2%",
//     color:'#231dd3',
//     fontSize:20, 
//   },
  
//   zomet_settings_text: {
//     color:'#231dd3',
//     alignSelf:'flex-end',
//     marginRight:'2%',
//     marginTop:'2%',
//     fontSize:20, //toTo: I added this
//     marginBottom: 8, //toTo: I added this
//   },
//   zomet_settings_text_h2: {
//       color:'#231dd3',
//       alignSelf:'flex-end',
//       marginRight:'2%',
//       marginTop:'2%',
//       fontWeight:'bold',
//       fontSize:25,
//       marginBottom: 12,
//   },
// });
