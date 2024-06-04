import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const baseWidth = 320;  
const baseHeight = 680; 

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight); // Use the smaller scale to ensure content fits within the screen

function normalize(size:any) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

function normalizeHeight(size:any) {
  const newSize = size * scaleHeight;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export default function Header() {

  const moveToSettings = () => {
    // props.navigation.replace('Settings');
  }

  return (
    <View style={styles.header}>
        <View style={styles.header_icons}>
          <View style={styles.left_icons}>
            <Ionicons name="wifi-outline" style={styles.wifi_icon} />
            <TouchableOpacity onPress={moveToSettings}>
              <Ionicons name="settings-outline" style={styles.settings_icon} onPress={moveToSettings}/>
            </TouchableOpacity>
          </View>
          <Image 
            style={styles.zomet_logo}
            source={require('../assets/images/zomet_icon.png')}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.application_title}>שעון אסטרונומי צומת</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  header_icons: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  left_icons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop:'5%',
  },
  application_title: {
    fontFamily: 'Arial',
    textAlign: 'center',
    color: '#231dd3',
    fontSize: normalize(30),
    marginLeft:'5%', 
  },
  zomet_logo: {
    justifyContent: 'flex-end',
    marginRight: normalize(10),
    width: normalize(80), 
    height: normalizeHeight(100), 
  },
  wifi_icon: {
    marginLeft: normalize(20),
    color: '#231dd3',
    fontSize: normalize(20),
    marginTop: normalizeHeight(25),
  },
  settings_icon: {
    marginLeft: normalize(20),
    color: '#231dd3',
    fontSize: normalize(20),
    marginTop: normalizeHeight(25),
  },
});
