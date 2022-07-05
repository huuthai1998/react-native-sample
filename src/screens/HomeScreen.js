import { useNavigation } from "@react-navigation/native";
import React from "react";

import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import AppScreens from "../constant/constant";
import { logOut } from "../store/reducers/authReducer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

function HomeScreen() {
  const navigation = useNavigation();

  const navigateToWallet = () => {
    navigation.navigate(AppScreens.WALLET_SCREEN);
  };

  const dispatch = useDispatch();
  const handleLogOut = () => {
    try {
      dispatch(logOut());
      navigation.navigate(AppScreens.LOGIN_SCREEN);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>HOME PAGE</Text>
      <TouchableOpacity
        onPress={navigateToWallet}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      >
        <Text>Go to Your Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogOut}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;
