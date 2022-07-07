import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppScreens from "../constant/AppScreens";
import Colors from "../constant/Colors";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  addButton: {
    backgroundColor: Colors.input,
    borderRadius: 12,
  },
  text: {
    color: "white",
    alignSelf: "flex-end",
    fontWeight: "600",
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
});

function NavBar() {
  const navigator = useNavigation();

  const navigateToAddToken = () => {
    navigator.navigate(AppScreens.ADD_TOKEN_SCREEN);
  };
  return (
    <TouchableOpacity style={styles.addButton} onPress={navigateToAddToken}>
      <Text style={styles.text}>ADD</Text>
    </TouchableOpacity>
  );
}

export default NavBar;
