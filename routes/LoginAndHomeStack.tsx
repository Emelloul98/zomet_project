import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Info from "../screens/Info";
import EditTable from "../screens/EditTable";
import Settings from "../screens/Settings";

const Stack = createStackNavigator();

export default function LoginAndHomeStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
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
        name="Info"
        component={Info}
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
