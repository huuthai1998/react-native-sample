import { useNavigation } from "@react-navigation/native";
import React from "react";

import { SafeAreaView, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import AppScreens from "../constant/constant";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

function HomeScreen() {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate(AppScreens.LOGIN_SCREEN);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>HOME PAGE</Text>
      <TouchableOpacity
        onPress={navigateToLogin}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      >
        <Text>go to log in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;
