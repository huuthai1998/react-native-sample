import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
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

function NavBar({ screen }) {
  const navigator = useNavigation();

  const navigateToScreen = () => {
    navigator.navigate(screen);
  };
  return (
    <TouchableOpacity style={styles.addButton} onPress={navigateToScreen}>
      <Text style={styles.text}>ADD</Text>
    </TouchableOpacity>
  );
}

NavBar.propTypes = {
  screen: PropTypes.string.isRequired,
};

export default NavBar;
