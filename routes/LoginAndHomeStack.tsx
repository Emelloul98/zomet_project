import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Info from "../screens/Info";
import EditTable from "../screens/EditTable";
import Settings from "../screens/Settings";

const Stack = createStackNavigator();

/**
 * LoginAndHomeStack component defines the stack navigator for the app.
 * It sets up the navigation routes for the EditTable, Info, and Settings screens.
 *
 * @returns {JSX.Element} The configured stack navigator.
 */

export default function LoginAndHomeStack() {
  return (
    /* Set the initial route to the EditTable screen */
    <Stack.Navigator initialRouteName="EditTable">
      <Stack.Screen
        name="EditTable"
        component={EditTable}
        options={{
          headerShown: false, // Hide the header for this screen
        }}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{
          headerShown: false, // Hide the header for this screen
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false, // Hide the header for this screen
        }}
      />
    </Stack.Navigator>
  );
}
