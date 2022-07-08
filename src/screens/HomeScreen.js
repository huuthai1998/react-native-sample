import { useNavigation } from "@react-navigation/native";
import React from "react";

import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

import AppScreens from "../constant/AppScreens";
import Colors from "../constant/Colors";
import { logOut } from "../store/reducers/authReducer";
import Images from "../assets/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    // flexDirection: "row",
  },
  toWallet: {
    width: 150,
    backgroundColor: Colors.button,
    borderRadius: 6,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  logout: {
    width: 150,
    borderColor: Colors.buttonBorder,
    borderRadius: 6,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  text: {
    fontWeight: "800",
    color: "white",
    fontSize: 15,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 100 / 2,
    overflow: "hidden",
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
      <View styles={{ marginVertical: 50 }}>
        <Image source={Images.home} style={styles.image} />
      </View>
      <TouchableOpacity
        onPress={navigateToWallet}
        color="#841584"
        style={styles.toWallet}
      >
        <Text style={styles.text}>Your Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogOut}
        color="#841584"
        style={styles.logout}
      >
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;
