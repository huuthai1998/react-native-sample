// import { StackActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Images from "../assets/index";
// import AppScreens from "../constant/constant";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  img: { height: "100%", width: "100%", resizeMode: "cover" },
});

function Splash() {
  // const { dispatch } = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={Images.splash} />
    </View>
  );
}

export default Splash;
