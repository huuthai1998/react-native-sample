import { useNavigation } from "@react-navigation/native";
import React from "react";

import { SafeAreaView, StyleSheet, Text, Button } from "react-native";

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
      <Button
        onPress={navigateToLogin}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
