import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import HomeScreen from "../screens/HomeScreen";
import AppScreens from "../constant/constant";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

axios.defaults.baseURL = "http://18.191.86.243:80";
// Insert token here
axios.defaults.headers.common.authorization = "AUTH TOKEN";

function AppNavigator() {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={AppScreens.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppScreens.HOME_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
