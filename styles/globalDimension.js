/*
  This file is used to normalize the size of the components in the app.
  It is used to make the app fit in all screen sizes.  
*/
import { Dimensions, PixelRatio } from "react-native";

// Get the screen dimenstions
export const { width, height } = Dimensions.get("window");
const baseWidth = 320;
const baseHeight = 680;

// calculate the scale factor
const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight); // Use the smaller scale to ensure content fits within the screen

// A function that takes the hieght of the screen and returns the normalized size
export function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// A function that takes the width of the screen and returns the normalized width
export function normalizeHeight(size) {
  const newSize = size * scaleHeight;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
