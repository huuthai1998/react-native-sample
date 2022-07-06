import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppScreens from "../constant/AppScreens";
import Colors from "../constant/Colors";
import { clearLoginErrorMessage, signIn } from "../store/reducers/authReducer";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.subtitle,
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 25,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.button,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  form: {
    alignItems: "center",
    backgroundColor: Colors.input,
    borderRadius: 8,
    flexDirection: "row",
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  label: {
    color: Colors.label,
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    width: 80,
  },
  textInput: {
    color: "white",
    flex: 1,
  },
  error: {
    color: Colors.error,
    fontWeight: "300",
    marginBottom: 10,
  },
});

function LoginScreen() {
  const navigation = useNavigation();
  const { isAuth, loginErrorMessage } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const onChangeHandler = (key) => (value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const handleLogin = async () => {
    // this call may change loginErrorMessage state
    dispatch(signIn(userInfo));
  };

  useEffect(() => {
    setErrorMessage(loginErrorMessage);
  }, [loginErrorMessage]);

  useEffect(() => {
    dispatch(clearLoginErrorMessage());
  }, []);

  useEffect(() => {
    if (isAuth) navigation.navigate(AppScreens.HOME_SCREEN);
  }, [isAuth]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Text style={styles.title}>Welcome to Crypto Wallet!</Text>

        <Text style={styles.subtitle}>Sign in to your account</Text>

        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Username</Text>

            <TextInput
              autoCapitalize="none"
              autoCompleteType="username"
              autoCorrect={false}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="username"
              onChangeText={onChangeHandler("username")}
            />
          </View>
        </Pressable>

        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Password</Text>

            <TextInput
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              returnKeyType="done"
              secureTextEntry
              style={styles.textInput}
              textContentType="password"
              onChangeText={onChangeHandler("password")}
            />
          </View>
        </Pressable>

        {errorMessage && errorMessage.length > 0 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>Continue</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;
