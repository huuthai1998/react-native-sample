import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>LOG IN SCREEN</Text>
      <Text>EDIT HERE</Text>
    </SafeAreaView>
  );
}

export default LoginScreen;
