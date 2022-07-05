import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppScreens from "../constant/constant";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  addButton: {},
});

function NavBar() {
  const navigator = useNavigation();

  const navigateToAddToken = () => {
    navigator.navigate(AppScreens.ADD_TOKEN_SCREEN);
  };
  return (
    <TouchableOpacity style={styles.addButton} onPress={navigateToAddToken}>
      <Text style={{ alignSelf: "flex-end" }}>ADD</Text>
    </TouchableOpacity>
  );
}

export default NavBar;
