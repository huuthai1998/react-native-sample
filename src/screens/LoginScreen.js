import React from "react";
import {
  // Alert,
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

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#000000",
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
    marginBottom: 10,
  },
  subtitle: {
    color: "rgba(235, 235, 245, 0.6)",
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
    backgroundColor: "rgb(93, 95, 222)",
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
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  form: {
    alignItems: "center",
    backgroundColor: "rgb(58, 58, 60)",
    borderRadius: 8,
    flexDirection: "row",
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  label: {
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    width: 80,
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  textInput: {
    color: "#FFFFFF",
    flex: 1,
  },
});

function LoginScreen() {
  const handleLogin = () => {
    //
  };

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
            <Text style={styles.label}>Email</Text>

            <TextInput
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              style={styles.textInput}
              textContentType="username"
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
            />
          </View>
        </Pressable>

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
