import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {
  normalize,
  normalizeHeight,
  height,
} from "../styles/globalDimension";
import { AntDesign } from "@expo/vector-icons";
type navProps = {
  navigation: any;
  backIcon: boolean;
  isConnect: boolean;
};
export default function Header(props: navProps) {

  return (
    <View style={styles.header}>
      <View style={styles.header_container}>
        <View style={styles.left_icons_container}>
          {props.backIcon && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('EditTable')}
            >
              <AntDesign name="left" size={24} style={styles.back_icon} />
            </TouchableOpacity>
          )}
          {!props.backIcon && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Settings", {isConnectToChip: props.isConnect})}
            >
              <Ionicons name="settings-outline" style={styles.settings_icon} />
            </TouchableOpacity>

          )}
          {!props.backIcon && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Info")} 
            >
            {/* <Ionicons name="information-circle-outline" style={styles.info_icon} /> */}
            <Icon name="info" style={styles.info_icon} />
            </TouchableOpacity>
          )}
        </View>
        <Image
          style={styles.zomet_logo}
          source={require("../assets/images/zomet_icon.png")}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: height * 0.15,
  },
  header_container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  left_icons_container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  settings_icon: {
    marginLeft: normalize(20),
    color: "#231dd3",
    fontSize: normalize(26),
    marginTop: normalizeHeight(10),
  },
  info_icon: {
    marginLeft: normalize(20),
    color: "#231dd3",
    fontSize: normalize(24),
    marginTop: normalizeHeight(10),
  },
  back_icon: {
    marginLeft: normalize(10),
    color: "#231dd3",
    fontSize: normalize(30),
    marginTop: normalizeHeight(10),
  },
  zomet_logo: {
    justifyContent: "flex-end",
    marginRight: normalize(10),
    width: normalize(80),
    height: normalizeHeight(70),
  },
  
});
