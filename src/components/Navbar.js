// import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import AppScreens from "../constant/constant";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  addButton: {},
});

function NavBar() {
  //   const { dispatch } = useNavigation();

  return (
    <TouchableOpacity style={styles.addButton}>
      <Text style={{ alignSelf: "flex-end" }}>ADD</Text>
    </TouchableOpacity>
  );
}

export default NavBar;
