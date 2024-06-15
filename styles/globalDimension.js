import {Dimensions, PixelRatio } from 'react-native'

export const { width, height } = Dimensions.get('window');
const baseWidth = 320;  
const baseHeight = 680; 
const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight); // Use the smaller scale to ensure content fits within the screen

export function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export  function normalizeHeight(size) {
  const newSize = size * scaleHeight;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}