import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AppScreens from "../constant/constant";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={AppScreens.HOME_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppScreens.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
