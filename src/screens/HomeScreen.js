import { useNavigation } from "@react-navigation/native";
import React from "react";

import { SafeAreaView, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import AppScreens from "../constant/constant";

import {
  decreaseByAmount,
  decrement,
  increaseByAmount,
  increment,
  reset,
  signIn,
} from "../store/reducers/authReducer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

function HomeScreen() {
  const navigation = useNavigation();

  const { counter } = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();
  const incrementCounter = () => dispatch(increment());
  const increaseBy5 = () => dispatch(increaseByAmount({ amount: 5 }));
  const decreaseBy10 = () => dispatch(decreaseByAmount({ amount: 10 }));
  const decrementCounter = () => dispatch(decrement());
  const resetCounter = () => dispatch(reset());
  const signInHandler = () => dispatch(signIn());
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
      />
      <TouchableOpacity onPress={increaseBy5}>
        <Text>increase by 5</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={incrementCounter} z>
        <Text>Increment</Text>
      </TouchableOpacity>
      <Text>{counter}</Text>
      <TouchableOpacity onPress={decrementCounter}>
        <Text>Decrement</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={decreaseBy10}>
        <Text>decrease by 10</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetCounter}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signInHandler}>
        <Text>LOG IN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;
