// header component that contains the logo, the settings and info icons.
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { normalize, normalizeHeight, height } from "../styles/globalDimension";
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
          {/* if backIcon is true, the back icon will be displayed, otherwise the settings and info icons will be displayed. */}
          {props.backIcon && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("EditTable")}
            >
              <AntDesign name="left" size={24} style={styles.back_icon} />
            </TouchableOpacity>
          )}
          {/* if the user is connected to the chip, the settings icon will be displayed. */}
          {!props.backIcon && props.isConnect && (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Settings", {
                  isConnectToChip: props.isConnect,
                })
              }
            >
              <Ionicons name="settings-outline" style={styles.settings_icon} />
            </TouchableOpacity>
          )}
          {/* if the user is not connected to the chip, the info icon will be displayed. */}
          {!props.backIcon && (
            <TouchableOpacity onPress={() => props.navigation.navigate("Info")}>
              <Icon name="info" style={styles.info_icon} />
            </TouchableOpacity>
          )}
        </View>
        {/* zomet logo */}
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
    flexDirection: "row-reverse",
    width: "100%",
  },
  left_icons_container: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  settings_icon: {
    marginRight: normalize(20),
    color: "#ffa200",
    fontSize: normalize(26),
    marginTop: normalizeHeight(20),
  },
  info_icon: {
    marginRight: normalize(20),
    color: "#ffa200",
    fontSize: normalize(24),
    marginTop: normalizeHeight(20),
  },
  back_icon: {
    marginRight: normalize(10),
    color: "#007E97",
    fontSize: normalize(30),
    marginTop: normalizeHeight(20),
  },
  zomet_logo: {
    justifyContent: "flex-end",
    marginLeft: normalize(10),
    width: normalize(80),
    height: normalizeHeight(70),
  },
});
