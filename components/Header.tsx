import React from "react";
import {StyleSheet,Text,View,Image,TouchableOpacity,Dimensions,PixelRatio,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { normalize, normalizeHeight, height } from "../styles/globalDimension";
import { AntDesign } from '@expo/vector-icons';
type navProps = {
  nav: any;
  settingsIcon: string;
  backIcon: string;
  whereToBack: string;
};
export default function Header(props: navProps) {

  return (
    <View style={styles.header}>
      <View style={styles.header_icons}>
        <View style={styles.left_icons}>
          {props.backIcon === "Back" && (
            <TouchableOpacity onPress={()=> props.nav.navigate(props.whereToBack)}>
              <AntDesign name="left" size={24} style={styles.headers_icon}/>
            </TouchableOpacity>
          )}
          <Ionicons name="wifi-outline" style={styles.headers_icon} />
          {props.settingsIcon === "Settings" && (
            <TouchableOpacity onPress={()=> props.nav.navigate("Settings")}>
              <Ionicons name="settings-outline" style={styles.headers_icon} />
            </TouchableOpacity>
          )}
        </View>
        <Image
          style={styles.zomet_logo}
          source={require("../assets/images/zomet_icon.png")}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.application_title}>אפליקציית שעון אסטרונומי </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: height * 0.15,
  },
  header_icons: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  left_icons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  application_title: {
    fontFamily: "Arial",
    textAlign: "center",
    color: "#231dd3",
    fontSize: normalize(27),
    marginLeft: "5%",
  },
  zomet_logo: {
    justifyContent: "flex-end",
    marginRight: normalize(10),
    width: normalize(80),
    height: normalizeHeight(70),
  },
  headers_icon: {
    marginLeft: normalize(20),
    color: "#231dd3",
    fontSize: normalize(20),
    marginTop: normalizeHeight(25),
  },
});
