import { Image, StyleSheet, Platform, View } from "react-native";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Settings from "../screens/Settings";

const Stack = createStackNavigator();

export default function LoginAndHomeStack() {
  // todo initialRouteName="Login"
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditTable"
        component={EditTable}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
