import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { useSelector } from "react-redux";
import HomeScreen from "../screens/HomeScreen";
import AppScreens from "../constant/AppScreens";
import LoginScreen from "../screens/LoginScreen";
import WalletScreen from "../screens/WalletScreen";
import Splash from "../screens/SplashScreen";
import NavBar from "../components/Navbar";
import AddTokenScreen from "../screens/AddTokenScreen";
import AddPositionScreen from "../screens/AddPositionScreen";

const Stack = createNativeStackNavigator();

axios.defaults.baseURL = "http://18.191.86.243";
axios.defaults.headers.common.accept = "application/json";

function NavBarRender() {
  return <NavBar />;
}

function AppNavigator() {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  }, [token]);

  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={AppScreens.ADD_POSITION_SCREEN}
        component={AddPositionScreen}
        options={{
          headerShown: true,
          title: "Add New Position",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#1B1D24",
          },
        }}
      />
      <Stack.Screen
        name={AppScreens.SPLASH_SCREEN}
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AppScreens.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppScreens.HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: true,
          title: "Home Page",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#1B1D24",
          },
        }}
      />
      <Stack.Screen
        name={AppScreens.WALLET_SCREEN}
        component={WalletScreen}
        options={{
          headerShown: true,
          headerRight: NavBarRender,
          title: "My Wallet",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#1B1D24",
          },
        }}
      />
      <Stack.Screen
        name={AppScreens.ADD_TOKEN_SCREEN}
        component={AddTokenScreen}
        options={{
          headerShown: true,
          title: "Add New Token",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#1B1D24",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
