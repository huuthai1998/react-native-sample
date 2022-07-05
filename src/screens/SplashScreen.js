import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, View, StyleSheet } from "react-native";
import Images from "../assets/index";
import AppScreens from "../constant/constant";

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
  const { dispatch } = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      dispatch(StackActions.replace(AppScreens.LOGIN_SCREEN));
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={Images.splash} />
    </View>
  );
}

export default Splash;
